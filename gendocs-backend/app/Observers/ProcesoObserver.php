<?php

namespace App\Observers;

use App\Constants\MimeType;
use App\Models\Directorio;
use App\Models\Proceso;
use App\Services\GoogleDriveService;
use App\Traits\Nameable;

class ProcesoObserver
{
    use Nameable;

    protected GoogleDriveService $googleDrive;

    /**
     * @param GoogleDriveService $googleDrive
     */
    public function __construct(GoogleDriveService $googleDrive)
    {
        $this->googleDrive = $googleDrive;
        $this->setPrefix('PROCESO');
    }

    /**
     * Handle the Proceso "created" event.
     *
     * @param \App\Models\Proceso $proceso
     * @return void
     */
    public function created(Proceso $proceso)
    {
        $proceso->directorio()->create([
            'google_drive_id' => $this->googleDrive->create(
                $this
                    ->setName($proceso->nombre)
                    ->generateName(),
                MimeType::DRIVE_FOLDER,
                Directorio::find($proceso->directorio_id)->drive_id
            )->id
        ]);
    }

    /**
     * Handle the Proceso "updated" event.
     *
     * @param \App\Models\Proceso $proceso
     * @return void
     */
    public function updated(Proceso $proceso)
    {
        if ($proceso->wasChanged('nombre')) {
            $this->googleDrive->rename(
                $proceso->directorio->google_drive_id,
                $this
                    ->setName($proceso->nombre)
                    ->generateName()
            );
        }
    }

    /**
     * Handle the Proceso "deleted" event.
     *
     * @param \App\Models\Proceso $proceso
     * @return void
     */
    public function deleted(Proceso $proceso)
    {
        //
    }

    /**
     * Handle the Proceso "restored" event.
     *
     * @param \App\Models\Proceso $proceso
     * @return void
     */
    public function restored(Proceso $proceso)
    {
        //
    }

    /**
     * Handle the Proceso "force deleted" event.
     *
     * @param \App\Models\Proceso $proceso
     * @return void
     */
    public function forceDeleted(Proceso $proceso)
    {
        //
    }
}
