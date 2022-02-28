<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Directorio;
use App\Models\DriveApi;
use App\Models\User;
use App\Notifications\UserCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\GoogleDrive;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{

    protected GoogleDrive $googleDrive;

    public function __construct(GoogleDrive $googleDrive)
    {
        $this->authorizeResource(User::class);
        $this->googleDrive = $googleDrive;
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

            $permission = $this->googleDrive->shareFolder(
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
            return response()->noContent(4222);
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
                'email' => $validated['correo_principal'],
                'email_gmail' => $validated['correo_secundario'],
            ]);

            if (
                !$user->hasRole($role) ||
                $user->isDirty('email_gmail')
            ) {
                // Remove old email
                $this->googleDrive->deletePermission(
                    Directorio::query()->activeDirectory()->drive_id,
                    $user->permission->google_drive_id
                );

                // Add new permissions to new email
                $permissionCreated = $this->googleDrive->shareFolder(
                    $user->email_gmail,
                    Directorio::query()->activeDirectory()->drive_id,
                    $role->name_role_drive,
                );

                // Update relationship table
                $permission = $user->permission;
                $permission->fill(['google_drive_id' => $permissionCreated->id])->save();

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
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    public function destroy(User $user)
    {
        //
    }
}
