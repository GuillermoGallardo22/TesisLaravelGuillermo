<?php

namespace App\Observers;

use App\Constants\MimeType;
use App\Models\Plantillas;
use App\Models\Proceso;
use App\Services\GoogleDriveService;
use Illuminate\Support\Facades\Log;

class PlantillaObserver
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
     * Handle the Plantilla "created" event.
     *
     * @param Plantillas $plantilla
     * @return void
     */
    public function created(Plantillas $plantilla)
    {
        $google_drive_id = '';
        $plantillaBase = config('services.google.default_template');

        if ($plantillaBase) {
            $google_drive_id = $this->googleDrive->copyFile(
                $plantilla->nombre,
                $plantilla->proceso->directorio->google_drive_id,
                $plantillaBase,
            )->id;
        } else {
            $google_drive_id = $this->googleDrive->create(
                $plantilla->nombre,
                MimeType::DRIVE_DOC,
                $plantilla->proceso->directorio->google_drive_id,
            )->id;
        }

        $plantilla->archivo()->create([
            'google_drive_id' => $google_drive_id,
        ]);
    }

    /**
     * Handle the Plantillas "updated" event.
     *
     * @param Plantillas $plantilla
     * @return void
     */
    public function updated(Plantillas $plantilla)
    {
        if ($plantilla->wasChanged('nombre')) {
            $this->googleDrive->rename($plantilla->archivo->google_drive_id, $plantilla->nombre);
        }

        if ($plantilla->wasChanged('proceso_id')) {
            $fromProceso = Proceso::find($plantilla->getOriginal('proceso_id'));
            $toProceso = Proceso::find($plantilla->proceso_id);

            $this->googleDrive->move(
                $plantilla->archivo->google_drive_id,
                $toProceso->directorio->google_drive_id,
                $fromProceso->directorio->google_drive_id
            );
        }
    }

    /**
     * Handle the Plantillas "deleted" event.
     *
     * @param Plantillas $plantilla
     * @return void
     */
    public function deleted(Plantillas $plantilla)
    {
        //
    }

    /**
     * Handle the Plantillas "restored" event.
     *
     * @param Plantillas $plantilla
     * @return void
     */
    public function restored(Plantillas $plantilla)
    {
        //
    }

    /**
     * Handle the Plantillas "force deleted" event.
     *
     * @param Plantillas $plantilla
     * @return void
     */
    public function forceDeleted(Plantillas $plantilla)
    {
        //
    }
}
