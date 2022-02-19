<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\User;
use App\Notifications\UserCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(User::class);
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

        $tempPassword = '12345678';

        $userCreated = User::create([
            'name' => $validated['nombre'],
            'email' => $validated['correo_principal'],
            'email_gmail' => $validated['correo_secundario'],
            'password' => Hash::make($tempPassword),
        ]);

        $userCreated->assignRole($validated['rol']);

        $userCreated->notify(new UserCreated($request->user(), $tempPassword));

        return ResourceObject::make($userCreated);
    }

    public function show(User $user)
    {
        return ResourceObject::make($user);
    }

    public function update(Request $request, User $user)
    {
        //
    }

    public function destroy(User $user)
    {
        //
    }
}
