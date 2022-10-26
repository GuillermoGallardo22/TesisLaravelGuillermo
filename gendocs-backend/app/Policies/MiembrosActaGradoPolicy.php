<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Models\MiembrosActaGrado;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Log;

class MiembrosActaGradoPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::MiembroActaGrado['index']);
    }

    public function view(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::MiembroActaGrado['index']);
    }


    public function create(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::MiembroActaGrado['create']);
    }

    public function update(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::MiembroActaGrado['update']);
    }

    public function delete(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::MiembroActaGrado['delete']);
    }

    public function restore(User $user)
    {
        //
    }

    public function forceDelete(User $user)
    {
        //
    }
}
