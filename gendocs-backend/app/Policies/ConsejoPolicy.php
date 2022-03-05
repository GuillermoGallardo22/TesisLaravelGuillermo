<?php

namespace App\Policies;

use App\Constants\Roles;
use App\Models\Consejo;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ConsejoPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        //
    }

    public function view(User $user, Consejo $consejo)
    {
        //
    }

    public function create(User $user)
    {
        return $user->hasRole([Roles::Admin, Roles::AdminTemp]);
    }

    public function update(User $user, Consejo $consejo)
    {
        //
    }

    public function delete(User $user, Consejo $consejo)
    {
        //
    }

    public function restore(User $user, Consejo $consejo)
    {
        //
    }

    public function forceDelete(User $user, Consejo $consejo)
    {
        //
    }
}
