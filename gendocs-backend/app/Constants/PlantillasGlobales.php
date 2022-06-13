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
}
