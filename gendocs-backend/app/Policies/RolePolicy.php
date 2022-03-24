<?php

namespace App\Policies;

use App\Constants\Roles;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class RolePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->hasRole(Roles::Admin);
    }
}
