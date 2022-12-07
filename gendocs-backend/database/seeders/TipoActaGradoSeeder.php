<?php

namespace Database\Seeders;

use App\Constants\EstadoActas;
use App\Constants\TipoActaGrados;
use App\Models\Carrera;
use App\Models\EstadoActa;
use App\Models\TipoActaGrado;
use App\Models\TipoEstadoActaGrado;
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
        // ESTADOS DE ACTAS
        $estados = EstadoActa::all();
        $estadosFiltrados = $estados->where("codigo", "!=", EstadoActas::NO_RESENTACION);

        // TITULACIÓN
        $tipos = collect([
            [
                'nombre' => 'EXAMEN DE GRADO DE CARÁCTER COMPLEXIVO',
                'codigo' => TipoActaGrados::T_EGCC,
            ],
            [
                'nombre' => 'PROYECTO DE INVESTIGACIÓN',
                'codigo' => TipoActaGrados::T_PI,
            ],
            [
                'nombre' => 'ARTÍCULO ACADÉMICO',
                'codigo' => TipoActaGrados::T_AA,
            ],
        ]);

        $antiguasCarreras = Carrera::where('desaparecera', true)->get();

        foreach ($tipos as $data) {
            $tipo = TipoActaGrado::create([
                'nombre' => $data['nombre'],
                'codigo' => $data['codigo'],
            ]);

            if ($tipo->codigo != TipoActaGrados::T_EGCC) {
                foreach ($estados as $estado) {
                    TipoEstadoActaGrado::create([
                        'tipo_acta_grado_id' => $tipo->id,
                        'estado_acta_grado_id' => $estado->id,
                    ]);
                }
            } else {
                foreach ($estadosFiltrados as $estado) {
                    TipoEstadoActaGrado::create([
                        'tipo_acta_grado_id' => $tipo->id,
                        'estado_acta_grado_id' => $estado->id,
                    ]);
                }
            }

            foreach ($antiguasCarreras as $carrera) {
                $tipo
                    ->carreras()
                    ->attach($carrera);
            }
        }

        // INTEGRACIÓN CURRICULAR

        $tipos = collect([
            [
                'nombre' => 'EXAMEN DE GRADO DE CARÁCTER COMPLEXIVO',
                'codigo' => TipoActaGrados::IC_EGCC,
            ],
            [
                'nombre' => 'PROYECTO DE INVESTIGACIÓN',
                'codigo' => TipoActaGrados::IC_PI,
            ],
            [
                'nombre' => 'ARTÍCULO ACADÉMICO',
                'codigo' => TipoActaGrados::IC_AA,
            ],
        ]);

        $antiguasCarreras = Carrera::where('desaparecera', false)->get();

        foreach ($tipos as $data) {
            $tipo = TipoActaGrado::create([
                'nombre' => $data['nombre'],
                'codigo' => $data['codigo'],
            ]);

            if ($tipo->codigo != TipoActaGrados::IC_EGCC) {
                foreach ($estados as $estado) {
                    TipoEstadoActaGrado::create([
                        'tipo_acta_grado_id' => $tipo->id,
                        'estado_acta_grado_id' => $estado->id,
                    ]);
                }
            } else {
                foreach ($estadosFiltrados as $estado) {
                    TipoEstadoActaGrado::create([
                        'tipo_acta_grado_id' => $tipo->id,
                        'estado_acta_grado_id' => $estado->id,
                    ]);
                }
            }

            foreach ($antiguasCarreras as $carrera) {
                $tipo
                    ->carreras()
                    ->attach($carrera);
            }
        }
    }
}
