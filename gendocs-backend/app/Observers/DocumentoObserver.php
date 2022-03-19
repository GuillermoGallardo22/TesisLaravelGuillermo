<?php

namespace App\Observers;

use App\Models\Documento;
use App\Models\Numeracion;

class DocumentoObserver
{
    /**
     * Handle the Documento "created" event.
     *
     * @param \App\Models\Documento $documento
     * @return void
     */
    public function created(Documento $documento)
    {
        $numeracion = Numeracion::query()->where('numero', $documento->numero)->first();

        if (!$numeracion) {
            $numeracion = new  Numeracion([
                'numero' => $documento->numero,
            ]);
        }

        $numeracion
            ->fill([
                'usado' => true,
                'reservado' => false,
                'encolado' => false,
            ])
            ->save();
    }

    /**
     * Handle the Documento "updated" event.
     *
     * @param \App\Models\Documento $documento
     * @return void
     */
    public function updated(Documento $documento)
    {
        //
    }

    /**
     * Handle the Documento "deleted" event.
     *
     * @param \App\Models\Documento $documento
     * @return void
     */
    public function deleted(Documento $documento)
    {
        //
    }

    /**
     * Handle the Documento "restored" event.
     *
     * @param \App\Models\Documento $documento
     * @return void
     */
    public function restored(Documento $documento)
    {
        //
    }

    /**
     * Handle the Documento "force deleted" event.
     *
     * @param \App\Models\Documento $documento
     * @return void
     */
    public function forceDeleted(Documento $documento)
    {
        //
    }
}
