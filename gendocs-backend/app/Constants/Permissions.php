<?php

namespace App\Constants;

abstract class Permissions
{
    const Estudiantes = [
        'index' => 'estudiante.index',
        'create' => 'estudiante.create',
        'update' => 'estudiante.update',
    ];

    const Procesos = [
        'index' => 'proceso.index',
        'create' => 'proceso.create',
        'update' => 'proceso.update',
    ];

    const Plantillas = [
        'index' => 'plantilla.index',
        'create' => 'plantilla.create',
        'update' => 'plantilla.update',
    ];

    const Users = [
        'index' => 'user.index',
        'create' => 'user.create',
        'update' => 'user.update',
    ];
}
