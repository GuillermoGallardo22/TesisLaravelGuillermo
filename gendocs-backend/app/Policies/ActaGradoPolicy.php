<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Models\ActaGrado;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ActaGradoPolicy
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
        return $user->getAllPermissions()->contains('name', Permissions::ActaGrado['index']);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, ActaGrado $actaGrado)
    {
        return $user->getAllPermissions()->contains('name', Permissions::ActaGrado['index']);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::ActaGrado['create']);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, ActaGrado $actaGrado)
    {
        return $user->getAllPermissions()->contains('name', Permissions::ActaGrado['update']);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, ActaGrado $actaGrado)
    {
        return $user->getAllPermissions()->contains('name', Permissions::ActaGrado['delete']);
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, ActaGrado $actaGrado)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, ActaGrado $actaGrado)
    {
        //
    }
}
