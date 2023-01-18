<?php

namespace App\Constants;

abstract class Variables
{
    const FROM = '{{FROM}}';
    const TO = '{{TO}}';

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
     * Variables utilizadas para reemplazar datos de DOCENTES
     */
    const PREFIX_DOCENTES = 'docentes';
    const DOCENTE_N = '{{DOCENTE_N_$i}}';

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
    const ESTUDIANTE_FECHA_NACIMIENTO = "{{ESTUDIANTE_FECHA_NACIMIENTO}}";
    const ESTUDIANTE_TITULO = "{{ESTUDIANTE_TITULO}}";
    const ESTUDIANTE_TITULO_UPPER = "{{ESTUDIANTE_TITULO_UPPER}}";
    const ESTUDIANTE_TEMA = "{{ESTUDIANTE_TEMA}}";
    const ESTUDIANTE_TITULO_BACHILLER = "{{ESTUDIANTE_TITULO_BACHILLER}}";
    const ESTUDIANTE_FECHA_INICIO_ESTUDIOS_FECHAUP = "{{ESTUDIANTE_FECHA_INICIO_ESTUDIOS_FECHAUP}}";
    const ESTUDIANTE_FECHA_FIN_ESTUDIOS_FECHAUP = "{{ESTUDIANTE_FECHA_FIN_ESTUDIOS_FECHAUP}}";
    const COORDINADOR = "{{COORDINADOR}}";

    /**
     * Variables utilizadas para generar la plantilla del acta
     */
    const FECHA_U = "{{FECHA_U}}";          // 16 DE JULIO DE 2021
    const SESIONUP = "{{SESIONUP}}";        // ORDINARIA
    const SESION_L = "{{SESION_L}}";        // ordinaria
    const NUMACT = "{{NUMACT}}";            // 001
    const Y = "{{Y}}";                      // 2022
    const YEAR = "{{YEAR}}";                      // 2022
    const DIASEM_T = "{{DIASEM_T}}";        // VIERNES
    const NUMMES_T_U = "{{NUMMES_T_U}}";    // JULIO
    const MES_T_L = "{{MES_T_L}}";          // julio
    const NUMDIA_T = "{{NUMDIA_T}}";        // VEINTICINCO
    const NUMANIO_T = "{{NUMANIO_T}}";      // DOS MIL VEINTIUNO
    const NUMANIO_T_L = "{{NUMANIO_T_L}}";  // dos mil veintiuno
    const DIAS_T = "{{DIAS_T}}";            // veinticinco días
    const HORA_T_L = "{{HORA_T_L}}";        // ocho
    const MINUTOS_T_L = "{{MINUTOS_T_L}}";  // treinta
    const ASISTIERON = "{{ASISTIERON}}";    // miembros que asistieron
    const NO_ASISTIERON = "{{NO_ASISTIERON}}";  // miembros que no asistieron

    /**
     * FECHAS
     */
    const HORA_MINUTOS_TEXTO_L = "{{HORA_MINUTOS_TEXTO_L}}";

    /**
     * ACTA GRADO
     */
    const ACTAGRADO_MIEMBROS_EC = "{{ACTAGRADO_MIEMBROS_EC}}";

    /**
     *
     */
    const DECANA = "{{DECANA}}";
    const PRESIDENTE_UNIDAD_IC = "{{PRESIDENTE_UNIDAD_IC}}";
}
