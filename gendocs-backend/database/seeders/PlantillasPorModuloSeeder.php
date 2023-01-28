<?php

namespace Database\Seeders;

use App\Constants\MimeType;
use App\Constants\Modulos;
use App\Models\PlantillasGlobales;
use Illuminate\Database\Seeder;

class PlantillasPorModuloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ([
            Modulos::FACU,
            Modulos::SUDE,
            // Modulos::TITU,
            // Modulos::CURR,
            // Modulos::COMM,
            Modulos::SIST,
            Modulos::INPA,
            Modulos::ELEC,
            Modulos::SOFT,
            Modulos::TECI,
            Modulos::TELE,
            Modulos::INDS,
        ] as $modulo) {
            PlantillasGlobales::create([
                'codigo' => $modulo,
                'nombre' => "Plantilla general $modulo",
                'tipo' => MimeType::DRIVE_DOC,
            ]);
        }
    }
}
