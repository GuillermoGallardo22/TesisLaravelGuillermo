<?php

namespace App\Services;

use App\Models\Directorio;
use App\Models\Documento;
use App\Models\Numeracion;

class NumeracionService
{
    public function checkNumeracion(Documento $documento)
    {
        $numeracion = Numeracion::query()->where('numero', $documento->numero)->first();
        $modulo = $documento->consejo->module->modulo;

        if (!$numeracion) {
            $last = Numeracion::max('numero');

            for ($i = $last + 1; $i <= $documento->numero; $i++) {
                Numeracion::create([
                    'numero' => $i,
                    'usado' => $documento->numero === $i,
                    'encolado' => $documento->numero !== $i,
                    'module_id' => $modulo->id,
                    'directorio_id' => Directorio::activeDirectory()->id,
                ]);
            }
        } else {
            $numeracion
                ->fill([
                    'usado' => true,
                    'reservado' => false,
                    'encolado' => false,
                ])
                ->save();
        }
    }
}
