<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Models\Plantillas;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PlantillasPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Plantillas['index']);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Plantillas $plantilla
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Plantillas $plantilla)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Plantillas['index']);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Plantillas['create']);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Plantillas $plantilla
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Plantillas $plantilla)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Plantillas['update']);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Plantillas $plantilla
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Plantillas $plantilla)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Plantillas $plantilla
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Plantillas $plantilla)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param \App\Models\User $user
     * @param \App\Models\Plantillas $plantilla
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Plantillas $plantilla)
    {
        //
    }
}
