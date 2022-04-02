<?php

namespace App\Constants;

abstract class Variables
{
    /**
     * Variables utilizadas para reemplazar datos para CONSEJO
     */
    const PREFIX_CONSEJO = 'consejo';
    const FECHA = "{{FECHA}}";
    const FECHAUP = "{{FECHAUP}}";
    const SESION = "{{SESION}}";
    const RESPONSABLE = "{{RESPONSABLE}}";

    /**
     * Variables utilizadas para reemplazar datos para información en GENERAL
     */
    const PREFEX_GENERAL = 'general';
    const CREADOPOR = "{{CREADOPOR}}";
    const NUMDOC = "{{NUMDOC}}";

    /**
     * Variables utilizadas para reemplazar datos para de ESTUDIANTE
     */
    const PREFIX_ESTUDIANTE = 'estudiante';
    const ESTUDIANTE = "{{ESTUDIANTE}}";
    const ESTUDIANTEUP = "{{ESTUDIANTEUP}}";
    const CEDULA = "{{CEDULA}}";
    const MATRICULA = "{{MATRICULA}}";
    const FOLIO = "{{FOLIO}}";
    const TELEFONO = "{{TELEFONO}}";
    const CELULAR = "{{CELULAR}}";
    const CORREO = "{{CORREO}}";
    const CORREOUTA = "{{CORREOUTA}}";
    const NOMBRECARRERA = "{{NOMBRECARRERA}}";
    const NOMBRECARRERAUP = "{{NOMBRECARRERAUP}}";
}
