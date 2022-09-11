<?php

namespace App\Observers;

use App\Constants\MimeType;
use App\Models\Directorio;
use App\Models\TipoActaGrado;
use App\Services\GoogleDriveService;

class TipoActaGradoObserver
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
     * Handle the TipoActaGrado "created" event.
     *
     * @param  \App\Models\TipoActaGrado  $tipoActaGrado
     * @return void
     */
    public function created(TipoActaGrado $tipoActaGrado)
    {
        $file = $this->googleDrive->create(
            $tipoActaGrado->nombre,
            MimeType::DRIVE_DOC,
            Directorio::activeDirectory()->drive_id,
        );

        $tipoActaGrado->archivo()->create([
            'google_drive_id' => $file->id,
        ]);
    }

    /**
     * Handle the TipoActaGrado "updated" event.
     *
     * @param  \App\Models\TipoActaGrado  $tipoActaGrado
     * @return void
     */
    public function updated(TipoActaGrado $tipoActaGrado)
    {
        //
    }

    /**
     * Handle the TipoActaGrado "deleted" event.
     *
     * @param  \App\Models\TipoActaGrado  $tipoActaGrado
     * @return void
     */
    public function deleted(TipoActaGrado $tipoActaGrado)
    {
        //
    }

    /**
     * Handle the TipoActaGrado "restored" event.
     *
     * @param  \App\Models\TipoActaGrado  $tipoActaGrado
     * @return void
     */
    public function restored(TipoActaGrado $tipoActaGrado)
    {
        //
    }

    /**
     * Handle the TipoActaGrado "force deleted" event.
     *
     * @param  \App\Models\TipoActaGrado  $tipoActaGrado
     * @return void
     */
    public function forceDeleted(TipoActaGrado $tipoActaGrado)
    {
        //
    }
}
