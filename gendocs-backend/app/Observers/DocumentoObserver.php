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
        Numeracion::create([
            'numero' => $documento->numero,
            'usado' => true,
            'reservado' => false,
            'encolado' => false,
        ]);
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
