<?php

namespace App\Observers;

use App\Constants\MimeType;
use App\Models\Directorio;
use App\Models\PlantillasGlobales;
use App\Services\GoogleDriveService;

class PlantillasGlobalesObserver
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
     * Handle the PlantillasGlobales "created" event.
     *
     * @param \App\Models\PlantillasGlobales $plantillasGlobales
     * @return void
     */
    public function created(PlantillasGlobales $plantillasGlobales)
    {
        $plantillasGlobales->archivo()->create([
            'google_drive_id' => $this->googleDrive->create(
                $plantillasGlobales->nombre,
                $plantillasGlobales->tipo,
                config("services.google.plantillas_globales"),
            )->id
        ]);
    }

    /**
     * Handle the PlantillasGlobales "updated" event.
     *
     * @param \App\Models\PlantillasGlobales $plantillasGlobales
     * @return void
     */
    public function updated(PlantillasGlobales $plantillasGlobales)
    {
        //
    }

    /**
     * Handle the PlantillasGlobales "deleted" event.
     *
     * @param \App\Models\PlantillasGlobales $plantillasGlobales
     * @return void
     */
    public function deleted(PlantillasGlobales $plantillasGlobales)
    {
        //
    }

    /**
     * Handle the PlantillasGlobales "restored" event.
     *
     * @param \App\Models\PlantillasGlobales $plantillasGlobales
     * @return void
     */
    public function restored(PlantillasGlobales $plantillasGlobales)
    {
        //
    }

    /**
     * Handle the PlantillasGlobales "force deleted" event.
     *
     * @param \App\Models\PlantillasGlobales $plantillasGlobales
     * @return void
     */
    public function forceDeleted(PlantillasGlobales $plantillasGlobales)
    {
        //
    }
}
