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
}
