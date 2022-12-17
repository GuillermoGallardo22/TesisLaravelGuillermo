<?php

namespace Database\Seeders;

use App\Models\CeldasNotasTipoActaGrado;
use App\Models\TipoActaGrado;
use Illuminate\Database\Seeder;

class CeldasNotasTipoActaGradoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (TipoActaGrado::all() as $t) {
            CeldasNotasTipoActaGrado::create([
                'tipo_acta_grado_id' => $t->id,
                'celda' => "C5",
                'descripcion' => "NOTA 1",
            ]);

            CeldasNotasTipoActaGrado::create([
                'tipo_acta_grado_id' => $t->id,
                'celda' => "C6",
                'descripcion' => "NOTA 2",
            ]);

            CeldasNotasTipoActaGrado::create([
                'tipo_acta_grado_id' => $t->id,
                'celda' => "C7",
                'descripcion' => "NOTA 3",
            ]);

            CeldasNotasTipoActaGrado::create([
                'tipo_acta_grado_id' => $t->id,
                'celda' => "C10",
                'descripcion' => "TOTAL",
            ]);
        }
    }
}
