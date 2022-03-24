<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Constants\Roles;
use App\Models\Numeracion;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class NumeracionPolicy
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
        return $user->getAllPermissions()->contains('name', Permissions::Numeracion['index']);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Numeracion  $numeracion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Numeracion $numeracion)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Numeracion['index']);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->hasRole([Roles::Admin, Roles::AdminTemp]);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Numeracion  $numeracion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Numeracion $numeracion)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Numeracion['update']);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Numeracion  $numeracion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Numeracion $numeracion)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Numeracion  $numeracion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Numeracion $numeracion)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Numeracion  $numeracion
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Numeracion $numeracion)
    {
        //
    }
}
