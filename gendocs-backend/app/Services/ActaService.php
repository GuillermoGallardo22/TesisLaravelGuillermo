<?php

namespace App\Services;

use App\Constants\MimeType;
use App\Constants\Variables;
use App\Jobs\GenerarActa;
use App\Models\Acta;
use App\Models\Cargo;
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
            $moduleCode = $consejo->module->modulo->code;

            // GENERANDO DIRECTORIOS BASE
            Storage::deleteDirectory($consejo->nombre);
            Storage::makeDirectory($consejo->nombre);
            Storage::makeDirectory($consejo->nombre . '/generados');
            Storage::makeDirectory($consejo->nombre . '/descargados');

            // DESCARGANDO PLANTILLA SEPARADOR
            $response = $this->googleDriveService->exportFile(
                PlantillasGlobales::plaActSep($moduleCode)->archivo->google_drive_id,
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
            $moduleCode = $consejo->module->modulo->code;

            $documentoDrive = $this->googleDriveService->copyFile(
                "ACTA-",
                $consejo->directorio->google_drive_id,
                PlantillasGlobales::plaAct($moduleCode)->archivo->google_drive_id,
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

            $consejos = Directorio::activeDirectory()
                ->consejos
                ->where('estado', false);

            $numActa = 1;
            foreach ($consejos as $c) {
                if ($c->module->modulo->code === $moduleCode) {
                    $numActa++;
                }
            }

            $fecha = $consejo->fecha;
            $fecha->setTimeZone("America/Guayaquil");


            $asistieron = $consejo->miembros()->where('asistio', true)->get()->map(function ($m) {
                return $m->docente->nombres;
            })->all();

            $no_asistieron = $consejo->miembros()->where('asistio', false)->get()->map(function ($m) {
                return $m->docente->nombres;
            })->all();

            $consejoData = [
                Variables::FECHA => $this->formatDate($fecha),
                Variables::RESPONSABLE => $consejo->responsable->docente->nombres,
                //
                Variables::NUMACT => $this->format_NUMACT($numActa),
                Variables::FECHA_U => $this->format_FECHA_U($fecha),
                Variables::SESIONUP => strtoupper($tipoConsejo->nombre),
                Variables::SESION_L => mb_strtolower($tipoConsejo->nombre),
                Variables::Y => $this->format_Y($fecha),
                Variables::DIASEM_T => $this->format_DIASEM_T($fecha),
                Variables::NUMMES_T_U => $this->format_NUMMES_T_U($fecha),
                Variables::MES_T_L => $this->format_MES_T_L($fecha),
                Variables::NUMDIA_T => $this->format_NUMDIA_T($fecha),
                Variables::NUMANIO_T => $this->format_NUMANIO_T($fecha),
                Variables::NUMANIO_T_L => $this->format_NUMANIO_T_L($fecha),
                Variables::DIAS_T => $this->format_DIAS_T($fecha),
                Variables::HORA_T_L => $this->converNumberToWords($fecha->hour),
                Variables::MINUTOS_T_L => $this->converNumberToWords($fecha->minute),
                Variables::ASISTIERON => $this->asis($asistieron),
                Variables::NO_ASISTIERON => $this->no_asis($no_asistieron),
            ];

            $cargos = Cargo::query()->with(['docente'])->get()->map(function ($i, $k) {
                return [$i['variable'] => $i['docente']['nombres']];
            })->collapse()->toArray();


            $this->googleDriveService->replaceTextOnDocument(
                array_merge(
                    $consejoData,
                    $cargos,
                ),
                $documentoDrive->id,
            );

            return $acta;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
