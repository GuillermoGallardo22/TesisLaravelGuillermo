<?php

namespace App\Observers;

use App\Models\Directorio;
use App\Models\GoogleDrive;
use App\Models\Proceso;
use App\Traits\Nameable;

class ProcesoObserver
{
    use Nameable;

    protected GoogleDrive $googleDrive;

    /**
     * @param GoogleDrive $googleDrive
     */
    public function __construct(GoogleDrive $googleDrive)
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
                "folder",
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
