<?php

namespace App\Services;

use App\Constants\MimeType;
use App\Jobs\GenerarActa;
use App\Models\Acta;
use App\Models\Consejo;
use App\Models\PlantillasGlobales;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Storage;

class ActaService
{
    protected GoogleDriveService $googleDriveService;

    public function __construct(GoogleDriveService $googleDriveService)
    {
        $this->googleDriveService = $googleDriveService;
    }

    public function procesarDocumentos(Consejo $consejo)
    {
        try {
            $acta = $consejo->acta()->updateOrCreate([
                'consejo_id' => $consejo->id,
            ], [
                'consejo_id' => $consejo->id,
            ]);

            // GENERANDO DIRECTORIOS BASE
            Storage::makeDirectory($consejo->nombre);
            Storage::makeDirectory($consejo->nombre . '/generados');
            Storage::makeDirectory($consejo->nombre . '/descargados');

            // DESCARGANDO PLANTILLA SEPARADOR
            $response = $this->googleDriveService->exportFile(
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

            return $acta;
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function generarPlantilla(Acta $acta)
    {
        try {
            $consejo = $acta->consejo;

            $documentoDrive = $this->googleDriveService->copyFile(
                "ACTA-",
                $consejo->directorio->google_drive_id,
                PlantillasGlobales::plaAct()->archivo->google_drive_id,
            );

            $acta
                ->archivo()
                ->updateOrCreate(
                    [
                        'google_drive_id' => $acta->archivo?->google_drive_id,
                    ],
                    [
                        'google_drive_id' => $documentoDrive->id,
                    ]
                );

            return $acta;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
