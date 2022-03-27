<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Models\Miembro;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MiembroPolicy
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
        return $user->getAllPermissions()->contains('name', Permissions::ConsejosMiembros['index']);
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Miembro  $miembro
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Miembro $miembro)
    {
        return $user->getAllPermissions()->contains('name', Permissions::ConsejosMiembros['index']);
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::ConsejosMiembros['create']);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Miembro  $miembro
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Miembro $miembro)
    {
        return $user->getAllPermissions()->contains('name', Permissions::ConsejosMiembros['update']);
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Miembro  $miembro
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Miembro $miembro)
    {
        return $user->getAllPermissions()->contains('name', Permissions::ConsejosMiembros['delete']);
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Miembro  $miembro
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Miembro $miembro)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Miembro  $miembro
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Miembro $miembro)
    {
        //
    }
}
