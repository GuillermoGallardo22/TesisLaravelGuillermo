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

    public function view(User $user, User $model)
    {
        return $user->hasRole(Roles::Admin);
    }

    public function create(User $user)
    {
        return $user->hasRole(Roles::Admin);
    }

    public function update(User $user, User $model)
    {
        //
    }

    public function delete(User $user, User $model)
    {
        //
    }

    public function restore(User $user, User $model)
    {
        //
    }

    public function forceDelete(User $user, User $model)
    {
        //
    }
}
