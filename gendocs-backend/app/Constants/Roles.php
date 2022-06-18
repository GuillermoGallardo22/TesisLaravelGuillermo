<?php

namespace App\Constants;

abstract class Roles
{
    /**
     * ROLES DEL SISTEMA
     *
     * Los roles declarados acontinuación deben de estar mapeados
     * exactamente en el lado del cliente (front-end).
     */
    const Admin = 'Administrador';
    const AdminTemp = 'Administrador-Temporal';
    const Reader = 'Lector';
    const Writer = 'Escritor';

    /**
     * ROLES PARA GOOGLE DRIVE
     *
     * Estos roles son utilizados para otorgar permisos de lectura/escritura
     * por el servicio de google drive y sus dependencias.
     */
    const GReader = 'reader';
    const GWriter = 'writer';
}
