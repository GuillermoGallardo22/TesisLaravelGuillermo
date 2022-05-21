<?php

namespace App\Services;

use App\Constants\MimeType;
use App\Constants\Variables;
use App\Jobs\GenerarActa;
use App\Models\Acta;
use App\Models\Consejo;
use App\Models\Directorio;
use App\Models\PlantillasGlobales;
use App\Traits\ReplaceableDocText;
use Carbon\Carbon;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ActaService
{
    use ReplaceableDocText;

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
            $tipoConsejo = $consejo->tipoConsejo;

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

            $numActa = Directorio::activeDirectory()
                ->consejos
                ->where('estado', false)
                ->count() + 1;

            $now = now();

            $fecha = $consejo->fecha;
            $fecha->setTimeZone("America/Guayaquil");

            $asistieron = $consejo->miembros()->where('asistio', true)->get()->map(function ($m) {
                return $m->docente->nombres;
            })->all();

            $no_asistieron = $consejo->miembros()->where('asistio', false)->get()->map(function ($m) {
                return $m->docente->nombres;
            })->all();

            $consejoData = [
                Variables::FECHA => $this->formatDate($now),
                Variables::RESPONSABLE => $consejo->responsable->docente->nombres,
                //
                Variables::NUMACT => $this->format_NUMACT($numActa),
                Variables::FECHA_U => $this->format_FECHA_U($fecha),
                Variables::SESIONUP => strtoupper($tipoConsejo->nombre),
                Variables::SESION_L => mb_strtolower($tipoConsejo->nombre),
                Variables::Y => $this->format_Y($now),
                Variables::DIASEM_T => $this->format_DIASEM_T($now),
                Variables::NUMMES_T_U => $this->format_NUMMES_T_U($now),
                Variables::MES_T_L => $this->format_MES_T_L($now),
                Variables::NUMDIA_T => $this->format_NUMDIA_T($now),
                Variables::NUMANIO_T => $this->format_NUMANIO_T($now),
                Variables::NUMANIO_T_L => $this->format_NUMANIO_T_L($now),
                Variables::DIAS_T => $this->format_DIAS_T($now),
                Variables::HORA_T_L => $this->converNumberToWords($fecha->hour),
                Variables::MINUTOS_T_L => $this->converNumberToWords($fecha->minute),
                Variables::ASISTIERON => $this->asis($asistieron),
                Variables::NO_ASISTIERON => $this->no_asis($no_asistieron),
            ];

            $this->googleDriveService->replaceTextOnDocument(
                $consejoData,
                $documentoDrive->id,
            );

            return $acta;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
