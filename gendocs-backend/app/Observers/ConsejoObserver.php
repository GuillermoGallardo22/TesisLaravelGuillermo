<?php

namespace App\Observers;

use App\Models\Consejo;
use App\Services\GoogleDriveService;
use App\Traits\Nameable;

class ConsejoObserver
{
    use Nameable;

    protected GoogleDriveService $googleDrive;

    /**
     * @param GoogleDriveService $googleDrive
     */
    public function __construct(GoogleDriveService $googleDrive)
    {
        $this->googleDrive = $googleDrive;
        $this->setPrefix('CONSEJO');
    }

    /**
     * Handle the Consejo "created" event.
     *
     * @param Consejo $consejo
     * @return void
     */
    public function created(Consejo $consejo)
    {
        $directorio = $this->googleDrive->create(
            $this->setName($consejo->nombre)->generateName(),
            "folder",
            $consejo->directorioLocal->drive_id,
        );

        $consejo->directorio()->create([
            'google_drive_id' => $directorio->id,
        ]);
    }

    /**
     * Handle the Consejo "updated" event.
     *
     * @param Consejo $consejo
     * @return void
     */
    public function updated(Consejo $consejo)
    {
        if ($consejo->wasChanged('nombre')) {
            $this->googleDrive->rename(
                $consejo->directorio->google_drive_id,
                $this->setName($consejo->nombre)->generateName(),
            );
        }
    }

    /**
     * Handle the Consejo "deleted" event.
     *
     * @param Consejo $consejo
     * @return void
     */
    public function deleted(Consejo $consejo)
    {
        //
    }

    /**
     * Handle the Consejo "restored" event.
     *
     * @param Consejo $consejo
     * @return void
     */
    public function restored(Consejo $consejo)
    {
        //
    }

    /**
     * Handle the Consejo "force deleted" event.
     *
     * @param Consejo $consejo
     * @return void
     */
    public function forceDeleted(Consejo $consejo)
    {
        //
    }
}
