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
        // foreach (TipoActaGrado::all() as $t) {
        //     CeldasNotasTipoActaGrado::create([
        //         'tipo_acta_grado_id' => $t->id,
        //         'celda' => "C10",
        //         'variable_nota' => "NOTA_4",
        //         'variable_nota_texto' => "NOTA_4_TEXTO",
        //     ]);

        //     CeldasNotasTipoActaGrado::create([
        //         'tipo_acta_grado_id' => $t->id,
        //         'celda' => "C7",
        //         'variable_nota' => "NOTA_3",
        //         'variable_nota_texto' => "NOTA_3_TEXTO",
        //     ]);

        //     CeldasNotasTipoActaGrado::create([
        //         'tipo_acta_grado_id' => $t->id,
        //         'celda' => "C6",
        //         'variable_nota' => "NOTA_2",
        //         'variable_nota_texto' => "NOTA_2_TEXTO",
        //     ]);

        //     CeldasNotasTipoActaGrado::create([
        //         'tipo_acta_grado_id' => $t->id,
        //         'celda' => "C5",
        //         'variable_nota' => "NOTA_1",
        //         'variable_nota_texto' => "NOTA_1_TEXTO",
        //     ]);
        // }
    }
}
