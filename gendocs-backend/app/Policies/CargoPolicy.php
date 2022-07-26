<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Constants\Roles;
use App\Models\Cargo;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CargoPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Cargos['index']);
    }

    public function view(User $user, Cargo $cargo)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Cargos['index']);
    }

    public function create(User $user)
    {
        return $user->hasRole([Roles::Admin, Roles::AdminTemp]);
    }

    public function update(User $user, Cargo $cargo)
    {
        return $user->hasRole([Roles::Admin, Roles::AdminTemp]);
    }

    public function delete(User $user, Cargo $cargo)
    {
        return $user->hasRole([Roles::Admin, Roles::AdminTemp]);
    }

    public function restore(User $user, Cargo $cargo)
    {
        //
    }

    public function forceDelete(User $user, Cargo $cargo)
    {
        //
    }
}
