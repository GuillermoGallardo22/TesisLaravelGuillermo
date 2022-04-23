<?php

namespace App\Observers;

use App\Constants\MimeType;
use App\Jobs\GenerarActa;
use App\Models\Acta;
use App\Models\PlantillasGlobales;
use App\Services\GoogleDriveService;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ActaObserver
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
     * Handle the Acta "created" event.
     *
     * @param Acta $acta
     * @return void
     */
    public function created(Acta $acta)
    {
        $consejo = $acta->consejo;

        // GENERANDO DIRECTORIOS BASE
        Storage::makeDirectory($consejo->nombre);
        Storage::makeDirectory($consejo->nombre . '/generados');
        Storage::makeDirectory($consejo->nombre . '/descargados');

        // DESCARGANDO PLANTILLA SEPARADOR
        $response = $this->googleDrive->exportFile(
            PlantillasGlobales::plaActSep()->archivo->google_drive_id,
            MimeType::DOCX,
        );

        Storage::put(
            $consejo->nombre . "/separador.docx",
            $response->getBody()
        );

        // GENERANDO TRABAJOS EN SEGUNDO PLANO
        $jobs = [];

        foreach ($consejo->documentos as $documento) {
            $jobs[] = new GenerarActa($consejo, $documento);
        }

        $batch = Bus::batch($jobs)->dispatch();

        $acta->update([
            'output_path' => $consejo->nombre,
            'batch' => $batch->id,
        ]);
    }

    /**
     * Handle the Acta "updated" event.
     *
     * @param Acta $acta
     * @return void
     */
    public function updated(Acta $acta)
    {
        Log::info("actualizando...");
    }

    /**
     * Handle the Acta "deleted" event.
     *
     * @param Acta $acta
     * @return void
     */
    public function deleted(Acta $acta)
    {
        //
    }

    /**
     * Handle the Acta "restored" event.
     *
     * @param Acta $acta
     * @return void
     */
    public function restored(Acta $acta)
    {
        //
    }

    /**
     * Handle the Acta "force deleted" event.
     *
     * @param Acta $acta
     * @return void
     */
    public function forceDeleted(Acta $acta)
    {
        //
    }
}
