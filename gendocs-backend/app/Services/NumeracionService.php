<?php

namespace App\Services;

use App\Models\Directorio;
use App\Models\Documento;
use App\Models\Numeracion;

class NumeracionService
{
    public function checkNumeracion(Documento $documento)
    {
        $modulo = $documento->consejo->module->modulo;
        $numeracion = Numeracion::query()
            ->where('numero', $documento->numero)
            ->where('module_id', $modulo->id)
            ->first();

        if (!$numeracion) {
            $last = Numeracion::query()
                ->where('module_id', $modulo->id)
                ->max('numero');

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
