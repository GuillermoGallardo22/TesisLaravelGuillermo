<?php

namespace App\Policies;

use App\Constants\Roles;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->hasRole([Roles::Admin, Roles::AdminTemp]);
    }

    public function view(User $userLogged, User $user)
    {
        return $userLogged->hasRole(Roles::Admin);
    }

    public function create(User $user)
    {
        return $user->hasRole(Roles::Admin);
    }

    public function update(User $userLogged, User $user)
    {
        return $userLogged->hasRole(Roles::Admin);
    }

    public function delete(User $userLogged, User $user)
    {
        //
    }

    public function restore(User $userLogged, User $user)
    {
        //
    }

    public function forceDelete(User $userLogged, User $user)
    {
        //
    }
}
