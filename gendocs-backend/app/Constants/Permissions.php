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

    const Consejos = [
        'index' => 'consejo.index',
        'create' => 'consejo.create',
        'update' => 'consejo.update',
        'delete' => 'consejo.delete'
    ];

    const Users = [
        'index' => 'user.index',
        'create' => 'user.create',
        'update' => 'user.update',
    ];

    const Documentos = [
        'index' => 'documento.index',
        'create' => 'documento.create',
        'update' => 'documento.update',
        'delete' => 'documento.delete'
    ];

    const Numeracion = [
        'index' => 'numeracion.index',
        'create' => 'numeracion.create',
        'update' => 'numeracion.update',
    ];

    const Carreras = [
        'index' => 'carrera.index',
        'create' => 'carrera.create',
        'update' => 'carrera.update',
    ];
}
