<?php

namespace App\Observers;

use App\Models\Documento;
use App\Models\Numeracion;
use App\Services\DocumentoService;
use Illuminate\Support\Facades\Log;

class DocumentoObserver
{

    protected DocumentoService $service;

    public function __construct(DocumentoService $service)
    {
        $this->service = $service;
    }

    /**
     * Handle the Documento "created" event.
     *
     * @param \App\Models\Documento $documento
     * @return void
     */
    public function created(Documento $documento,)
    {
        $this->service->generar($documento);
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
        $numeracion = Numeracion::query()
            ->where('numero', $documento->numero)
            ->where('module_id', $documento->consejo->module->modulo->id)
            ->first();

        $numeracion->update([
            'usado' => false,
            'encolado' => true,
        ]);
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
