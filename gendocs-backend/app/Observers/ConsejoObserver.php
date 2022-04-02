<?php

namespace App\Observers;

use App\Constants\Variables;
use App\Models\Consejo;
use App\Services\GoogleDriveService;
use App\Traits\Nameable;
use App\Traits\ReplaceableDocText;

class ConsejoObserver
{
    use Nameable, ReplaceableDocText;

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

        if ($consejo->wasChanged('fecha')) {
            $fecha = $this->formatDate($consejo->fecha);
            $fechaUP = $this->formatDateText($consejo->fecha);

            foreach ($consejo->documentos as $documento) {
                $variables = json_decode($documento->variables, true);

                $this->googleDrive->replaceTextOnDocument([
                    $variables[Variables::PREFIX_CONSEJO][Variables::FECHA] => $fecha,
                    $variables[Variables::PREFIX_CONSEJO][Variables::FECHAUP] => $fechaUP,
                ], $documento->archivo->google_drive_id);

                $variables[Variables::PREFIX_CONSEJO][Variables::FECHA] = $fecha;
                $variables[Variables::PREFIX_CONSEJO][Variables::FECHAUP] = $fechaUP;

                $documento->update([
                    'variables' => $variables,
                ]);
            }
        }

        if ($consejo->wasChanged('tipo_consejo_id')) {
            $session = $this->textToUpperLower($consejo->tipoConsejo->nombre, "lower");

            foreach ($consejo->documentos as $documento) {
                $variables = json_decode($documento->variables, true);

                $this->googleDrive->replaceTextOnDocument([
                    $variables[Variables::PREFIX_CONSEJO][Variables::SESION] => $session,
                ], $documento->archivo->google_drive_id);

                $variables[Variables::PREFIX_CONSEJO][Variables::SESION] = $session;

                $documento->update([
                    'variables' => $variables,
                ]);
            }
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
