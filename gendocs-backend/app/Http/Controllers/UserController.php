<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Directorio;
use App\Models\User;
use App\Notifications\UserCreated;
use App\Notifications\UserResetPassword;
use App\Services\GoogleDriveService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class UserController extends Controller
{

    protected GoogleDriveService $googleDriveService;

    public function __construct(GoogleDriveService $googleDriveService)
    {
        $this->authorizeResource(User::class);
        $this->googleDriveService = $googleDriveService;
    }

    public function me(Request $request)
    {
        return ResourceObject::make($request->user());
    }

    public function index()
    {
        return ResourceCollection::make(User::all());
    }

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();

            $role = Role::find($validated['rol']);

            $tempPassword = Str::random(8);

            $userCreated = User::create([
                'name' => $validated['nombre'],
                'email' => $validated['correo_principal'],
                'email_gmail' => $validated['correo_secundario'],
                'password' => Hash::make($tempPassword),
            ]);

            $userCreated->assignRole($role);

            $userCreated->notify(new UserCreated($request->user(), $tempPassword));

            $permission = $this->googleDriveService->shareFolder(
                $userCreated->email_gmail,
                Directorio::query()->activeDirectory()->drive_id,
                $role->name_role_drive,
            );

            $userCreated->permission()->create([
                'google_drive_id' => $permission->id,
            ]);

            DB::commit();

            return ResourceObject::make($userCreated);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->noContent(ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function show(User $user)
    {
        return ResourceObject::make($user);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();

            $role = Role::find($validated['rol']);

            $user->fill([
                'name' => $validated['nombre'],
                'status' => $validated['status'],
                'email' => $validated['correo_principal'],
                'email_gmail' => $validated['correo_secundario'],
            ]);

            $needsNewAccess = false;

            if ($user->isDirty('status')) {
                if ($user->status) {
                    $needsNewAccess = true;
                } else {
                    // Remove old email
                    $permission = $user->permission;
                    if ($permission) {
                        $this->googleDriveService->deletePermission(
                            Directorio::query()->activeDirectory()->drive_id,
                            $user->permission->google_drive_id
                        );

                        $permission->delete();
                    }
                }
            }

            if (
                !$user->hasRole($role) ||
                $user->isDirty('email_gmail') ||
                $needsNewAccess
            ) {
                // Remove old email
                $permission = $user->permission;
                if ($permission) {
                    $this->googleDriveService->deletePermission(
                        Directorio::query()->activeDirectory()->drive_id,
                        $user->permission->google_drive_id
                    );

                    $permission->delete();
                }

                // Add new permissions to new email
                $permission = $this->googleDriveService->shareFolder(
                    $user->email_gmail,
                    Directorio::query()->activeDirectory()->drive_id,
                    $role->name_role_drive,
                );

                // Update relationship table
                $user->permission()->create([
                    'google_drive_id' => $permission->id,
                ]);

                // Add new roles
                $user->roles()->detach();
                $user->assignRole($role);
            }

            $user->save();

            DB::commit();

            return ResourceObject::make($user);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'errors' => $e->getMessage(),
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $validated = $request->validated();
        $user = \request()->user();

        $user->fill([
            'name' => $validated['nombre'],
        ]);

        $user->save();

        return ResourceObject::make($user);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $validated = $request->validated();
        $user = \request()->user();

        if (!isset($validated['current_password']) || !Hash::check($validated['current_password'], $user->password)) {
            return response()->json([
                'errors' => trans('validation.custom.user.update.password')
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }

        $user->forceFill([
            'password' => Hash::make($validated['password']),
        ])->save();

        return response()->noContent(ResponseAlias::HTTP_OK);
    }

    public function resetPassword(Request $request)
    {
        $email = $request->email;

        $user = User::whereEmail($email)->first();

        if (!$user) {
            return;
        }

        $tempPassword = Str::random(8);

        $user->update([
            'password' => Hash::make($tempPassword),
        ]);

        $user->notify(new UserResetPassword($request->user(), $tempPassword));
    }

    public function destroy(User $user)
    {
        //
    }
}
