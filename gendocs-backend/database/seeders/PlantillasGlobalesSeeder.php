<?php

namespace Database\Seeders;

use App\Constants\PlantillasGlobales as ConstantsPlantillasGlobales;
use App\Models\PlantillasGlobales;
use Illuminate\Database\Seeder;

class PlantillasGlobalesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PlantillasGlobales::create([
            'codigo' => ConstantsPlantillasGlobales::PLANTILLA_ACTA,
            'nombre' => 'Plantilla acta',
        ]);

        PlantillasGlobales::create([
            'codigo' => ConstantsPlantillasGlobales::PLANTILLA_ACTA_SEPARADOR,
            'nombre' => 'Plantilla separador para acta',
        ]);

        PlantillasGlobales::create([
            'codigo' => ConstantsPlantillasGlobales::PLAN_ACTA_SUDE,
            'nombre' => 'Plantilla acta',
        ]);

        PlantillasGlobales::create([
            'codigo' => ConstantsPlantillasGlobales::PLAN_ACTA_SEPA_SUDE,
            'nombre' => 'Plantilla separador para acta',
        ]);
    }
}
