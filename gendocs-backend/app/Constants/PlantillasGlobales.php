<?php

namespace App\Constants;

class PlantillasGlobales
{
    const ACTA = 'PLA_ACT';
    const ACTA_SEP = 'PLA_ACT_SEP';
    const SEP = '::';

    // FACU
    const PLANTILLA_ACTA = PlantillasGlobales::ACTA . PlantillasGlobales::SEP . Modulos::FACU;
    const PLANTILLA_ACTA_SEPARADOR = PlantillasGlobales::ACTA_SEP . PlantillasGlobales::SEP . Modulos::FACU;

    // SUDE
    const PLAN_ACTA_SUDE = PlantillasGlobales::ACTA . PlantillasGlobales::SEP . Modulos::SUDE;
    const PLAN_ACTA_SEPA_SUDE = PlantillasGlobales::ACTA_SEP . PlantillasGlobales::SEP . Modulos::SUDE;

    // TITU
    const PLAN_ACTA_TITU = PlantillasGlobales::ACTA . PlantillasGlobales::SEP . Modulos::TITU;
    const PLAN_ACTA_SEPA_TITU = PlantillasGlobales::ACTA_SEP . PlantillasGlobales::SEP . Modulos::TITU;

    // CURR
    const PLAN_ACTA_CURR = PlantillasGlobales::ACTA . PlantillasGlobales::SEP . Modulos::CURR;
    const PLAN_ACTA_SEPA_CURR = PlantillasGlobales::ACTA_SEP . PlantillasGlobales::SEP . Modulos::CURR;

    // PLANTILLA SUBIR ESTUDIANTES
    const PLAN_SUBIR_ESTUDIANTES = "PLAN_SUBIR_ESTUDIANTES";


    //TITULACION

    // SIST
    const PLAN_ACTA_SIST = PlantillasGlobales::ACTA . PlantillasGlobales::SEP . Modulos::SIST;
    const PLAN_ACTA_SEPA_SIST = PlantillasGlobales::ACTA_SEP . PlantillasGlobales::SEP . Modulos::SIST;

    // INPA (INDUSTRIAL EN PROCESOS DE AUTOMATIZACION)
    const PLAN_ACTA_INPA = PlantillasGlobales::ACTA . PlantillasGlobales::SEP . Modulos::INPA;
    const PLAN_ACTA_SEPA_INPA = PlantillasGlobales::ACTA_SEP . PlantillasGlobales::SEP . Modulos::INPA;

    // ELEC (ELECTRNOICA Y COMUNICACIONES)
    const PLAN_ACTA_ELEC = PlantillasGlobales::ACTA . PlantillasGlobales::SEP . Modulos::ELEC;
    const PLAN_ACTA_SEPA_ELEC = PlantillasGlobales::ACTA_SEP . PlantillasGlobales::SEP . Modulos::ELEC;

    //TITULACION

    //INTEGRACION CURRICULAR

    // SOFT (SOFTWARE)
    const PLAN_ACTA_SOFT = PlantillasGlobales::ACTA . PlantillasGlobales::SEP . Modulos::SOFT;
    const PLAN_ACTA_SEPA_SOFT = PlantillasGlobales::ACTA_SEP . PlantillasGlobales::SEP . Modulos::SOFT;

    // TECI (TECNOLOGIA DE LA INFORMACION)
    const PLAN_ACTA_TECI = PlantillasGlobales::ACTA . PlantillasGlobales::SEP . Modulos::TECI;
    const PLAN_ACTA_SEPA_TECI = PlantillasGlobales::ACTA_SEP . PlantillasGlobales::SEP . Modulos::TECI;

    // TELE (TELECOMUNICACIONES)
    const PLAN_ACTA_TELE = PlantillasGlobales::ACTA . PlantillasGlobales::SEP . Modulos::TELE;
    const PLAN_ACTA_SEPA_TELE = PlantillasGlobales::ACTA_SEP . PlantillasGlobales::SEP . Modulos::TELE;

    // INDS (INDUSTRIAL)
    const PLAN_ACTA_INDS = PlantillasGlobales::ACTA . PlantillasGlobales::SEP . Modulos::INDS;
    const PLAN_ACTA_SEPA_INDS = PlantillasGlobales::ACTA_SEP . PlantillasGlobales::SEP . Modulos::INDS;

    //INTEGRACION CURRICULAR
}
