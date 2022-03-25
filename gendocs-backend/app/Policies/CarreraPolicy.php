<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Constants\Roles;
use App\Models\Carrera;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CarreraPolicy
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
        return $user->getAllPermissions()->contains('name', Permissions::Carreras['index']);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Carrera  $carrera
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Carrera $carrera)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Carreras['index']);
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
     * @param  \App\Models\Carrera  $carrera
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Carrera $carrera)
    {
        return $user->hasRole([Roles::Admin, Roles::AdminTemp]);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Carrera  $carrera
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Carrera $carrera)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Carrera  $carrera
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Carrera $carrera)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Carrera  $carrera
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Carrera $carrera)
    {
        //
    }
}
