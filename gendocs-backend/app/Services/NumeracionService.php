<?php

namespace App\Services;

use App\Models\Documento;
use App\Models\Numeracion;

class NumeracionService
{
    private Documento $documento;

    /**
     * @param Documento $documento
     */
    public function __construct(Documento $documento)
    {
        $this->documento = $documento;
    }

    public function setDocumento(Documento $documento): NumeracionService
    {
        $this->documento = $documento;
        return $this;
    }

    public function checkNumeracion()
    {
        $documento = $this->documento;

        $numeracion = Numeracion::query()->where('numero', $documento->numero)->first();

        if (!$numeracion) {
            $last = Numeracion::max('numero');

            for ($i = $last + 1; $i <= $documento->numero; $i++) {
                Numeracion::create([
                    'numero' => $i,
                    'usado' => $documento->numero === $i,
                    'encolado' => $documento->numero !== $i,
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
