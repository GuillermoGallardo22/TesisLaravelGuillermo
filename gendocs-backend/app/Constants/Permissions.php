<?php

namespace App\Constants;

abstract class Permissions
{
    static $Estudiantes = [
        'index' => 'estudiante.index',
        'create' => 'estudiante.create',
        'update' => 'estudiante.update',
    ];

    static $Procesos = [
        'index' => 'proceso.index',
        'create' => 'proceso.create',
        'update' => 'proceso.update',
    ];

    static $Plantillas = [
        'index' => 'plantilla.index',
        'create' => 'plantilla.create',
        'update' => 'plantilla.update',
    ];

    static $Users = [
        'index' => 'user.index',
        'create' => 'user.create',
        'update' => 'user.update',
    ];
}
