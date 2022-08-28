<?php

namespace Database\Seeders;

use App\Constants\TipoActaGrados;
use App\Models\Carrera;
use App\Models\TipoActaGrado;
use Illuminate\Database\Seeder;

class TipoActaGradoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // TITULACIÓN
        $actasGrado = collect([
            [
                'nombre' => 'EXAMEN DE GRADO DE CARÁCTER COMPLEXIVO',
                'codigo' => TipoActaGrados::T_EGCC,
            ],
            [
                'nombre' => 'PROYECTO DE INVESTIGACIÓN / ARTÍCULO ACADÉMICO',
                'codigo' => TipoActaGrados::T_PIAA,
            ]
        ]);

        $antiguasCarreras = Carrera::where('desaparecera', true)->get();

        foreach ($actasGrado as $data) {
            $acta = TipoActaGrado::create([
                'nombre' => $data['nombre'],
                'codigo' => $data['codigo'],
            ]);

            foreach ($antiguasCarreras as $carrera) {
                $acta
                    ->carreras()
                    ->attach($carrera);
            }
        }

        // INTEGRACIÓN CURRICULAR

        $actasGrado = collect([
            [
                'nombre' => 'EXAMEN DE GRADO DE CARÁCTER COMPLEXIVO',
                'codigo' => TipoActaGrados::IC_EGCC,
            ],
            [
                'nombre' => 'PROYECTO DE INVESTIGACIÓN / ARTÍCULO ACADÉMICO',
                'codigo' => TipoActaGrados::IC_PIAA,
            ]
        ]);

        $antiguasCarreras = Carrera::where('desaparecera', false)->get();

        foreach ($actasGrado as $data) {
            $acta = TipoActaGrado::create([
                'nombre' => $data['nombre'],
                'codigo' => $data['codigo'],
            ]);

            foreach ($antiguasCarreras as $carrera) {
                $acta
                    ->carreras()
                    ->attach($carrera);
            }
        }
    }
}
