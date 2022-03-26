<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Models\Docente;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DocentePolicy
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
        return $user->getAllPermissions()->contains('name', Permissions::Docentes['index']);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Docente  $docente
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Docente $docente)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Docentes['index']);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Docentes['create']);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Docente  $docente
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Docente $docente)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Docentes['update']);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Docente  $docente
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Docente $docente)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Docente  $docente
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Docente $docente)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Docente  $docente
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Docente $docente)
    {
        //
    }
}
