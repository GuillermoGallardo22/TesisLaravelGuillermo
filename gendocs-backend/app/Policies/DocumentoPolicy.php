<?php

namespace App\Policies;

use App\Constants\Permissions;
use App\Models\Documento;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DocumentoPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Documentos['index']);
    }

    public function view(User $user, Documento $documento)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Documentos['index']);
    }

    public function create(User $user)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Documentos['create']);
    }

    public function update(User $user, Documento $documento)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Documentos['update']);
    }

    public function delete(User $user, Documento $documento)
    {
        return $user->getAllPermissions()->contains('name', Permissions::Documentos['delete']);
    }

    public function restore(User $user, Documento $documento)
    {
        //
    }

    public function forceDelete(User $user, Documento $documento)
    {
        //
    }
}
