<?php

namespace App\Observers;

use App\Constants\Variables;
use App\Models\Miembro;
use App\Services\GoogleDriveService;

class MiembroObserver
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
     * Handle the Miembro "created" event.
     *
     * @param \App\Models\Miembro $miembro
     * @return void
     */
    public function created(Miembro $miembro)
    {
        if (count($miembro->consejo->documentos) && $miembro->responsable) {

            $responsable = $miembro->docente->nombres;

            foreach ($miembro->consejo->documentos as $documento) {
                $variables = json_decode($documento->variables, true);

                $this->googleDrive->replaceTextOnDocument([
                    $variables[Variables::PREFIX_CONSEJO][Variables::RESPONSABLE] => $responsable,
                ], $documento->archivo->google_drive_id);

                $variables[Variables::PREFIX_CONSEJO][Variables::RESPONSABLE] = $responsable;

                $documento->update([
                    'variables' => $variables,
                ]);
            }
        }
    }

    /**
     * Handle the Miembro "updated" event.
     *
     * @param \App\Models\Miembro $miembro
     * @return void
     */
    public function updated(Miembro $miembro)
    {
        //
    }

    /**
     * Handle the Miembro "deleted" event.
     *
     * @param \App\Models\Miembro $miembro
     * @return void
     */
    public function deleted(Miembro $miembro)
    {
        $miembro->update([
            'asistira' => false,
            'notificado' => false,
            'responsable' => false,
        ]);
    }

    /**
     * Handle the Miembro "restored" event.
     *
     * @param \App\Models\Miembro $miembro
     * @return void
     */
    public function restored(Miembro $miembro)
    {
        //
    }

    /**
     * Handle the Miembro "force deleted" event.
     *
     * @param \App\Models\Miembro $miembro
     * @return void
     */
    public function forceDeleted(Miembro $miembro)
    {
        //
    }
}
