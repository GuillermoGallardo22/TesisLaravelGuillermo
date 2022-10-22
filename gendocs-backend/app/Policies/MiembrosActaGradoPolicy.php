<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Models\MiembrosActaGrado;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MiembrosActaGradoPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::MiembroActaGrado['index']);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\MiembrosActaGrado  $miembrosActaGrado
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, MiembrosActaGrado $miembrosActaGrado)
    {
        return $user->getAllPermissions()->contains('name', Permissions::MiembroActaGrado['index']);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::MiembroActaGrado['create']);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\MiembrosActaGrado  $miembrosActaGrado
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, MiembrosActaGrado $miembrosActaGrado)
    {
        return $user->getAllPermissions()->contains('name', Permissions::MiembroActaGrado['update']);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\MiembrosActaGrado  $miembrosActaGrado
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, MiembrosActaGrado $miembrosActaGrado)
    {
        return $user->getAllPermissions()->contains('name', Permissions::MiembroActaGrado['delete']);
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\MiembrosActaGrado  $miembrosActaGrado
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, MiembrosActaGrado $miembrosActaGrado)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\MiembrosActaGrado  $miembrosActaGrado
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, MiembrosActaGrado $miembrosActaGrado)
    {
        //
    }
}
