<?php

namespace App\Observers;

use App\Constants\MimeType;
use App\Models\TipoEstadoActaGrado;
use App\Services\GoogleDriveService;

class TipoEstadoActaGradoObserver
{
    protected GoogleDriveService $googleDrive;

    /**
     * @param GoogleDriveService $googleDrive
     */
    public function __construct(GoogleDriveService $googleDrive)
    {
        $this->googleDrive = $googleDrive;
    }

    /**
     * Handle the TipoEstadoActaGrado "created" event.
     *
     * @param  \App\Models\TipoEstadoActaGrado  $tipoEstadoActaGrado
     * @return void
     */
    public function created(TipoEstadoActaGrado $tipoEstadoActaGrado)
    {

        $file = $this->googleDrive->create(
            $tipoEstadoActaGrado->tipoActaGrado->codigo . " | " . $tipoEstadoActaGrado->estadoActaGrado->codigo,
            MimeType::DRIVE_DOC,
            config("services.google.agd")
        );

        $tipoEstadoActaGrado->archivo()->create([
            'google_drive_id' => $file->id,
        ]);
    }

    /**
     * Handle the TipoEstadoActaGrado "updated" event.
     *
     * @param  \App\Models\TipoEstadoActaGrado  $tipoEstadoActaGrado
     * @return void
     */
    public function updated(TipoEstadoActaGrado $tipoEstadoActaGrado)
    {
        //
    }

    /**
     * Handle the TipoEstadoActaGrado "deleted" event.
     *
     * @param  \App\Models\TipoEstadoActaGrado  $tipoEstadoActaGrado
     * @return void
     */
    public function deleted(TipoEstadoActaGrado $tipoEstadoActaGrado)
    {
        //
    }

    /**
     * Handle the TipoEstadoActaGrado "restored" event.
     *
     * @param  \App\Models\TipoEstadoActaGrado  $tipoEstadoActaGrado
     * @return void
     */
    public function restored(TipoEstadoActaGrado $tipoEstadoActaGrado)
    {
        //
    }

    /**
     * Handle the TipoEstadoActaGrado "force deleted" event.
     *
     * @param  \App\Models\TipoEstadoActaGrado  $tipoEstadoActaGrado
     * @return void
     */
    public function forceDeleted(TipoEstadoActaGrado $tipoEstadoActaGrado)
    {
        //
    }
}
