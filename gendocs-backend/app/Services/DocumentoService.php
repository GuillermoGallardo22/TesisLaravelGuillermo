<?php

namespace App\Services;

use App\Constants\Variables;
use App\Models\Cargo;
use App\Models\Documento;
use App\Traits\Nameable;
use App\Traits\ReplaceableDocText;
use Illuminate\Support\Facades\Log;

class DocumentoService
{
    use Nameable, ReplaceableDocText;

    protected GoogleDriveService $googleDrive;
    protected NumeracionService $numeracionService;

    /**
     * @param GoogleDriveService $googleDrive
     */
    public function __construct(GoogleDriveService $googleDrive, NumeracionService $numeracionService)
    {
        $this->googleDrive = $googleDrive;
        $this->numeracionService = $numeracionService;
    }

    public function generar(Documento $documento)
    {
        $numDoc = $this->formatDocNumber($documento->numero);

        $documentoDrive = $this->googleDrive->copyFile(
            $numDoc,
            $documento->consejo->directorio->google_drive_id,
            $documento->plantilla->archivo->google_drive_id,
        );

        $documento->archivo()->create([
            'google_drive_id' => $documentoDrive->id,
        ]);

        $this->numeracionService
            ->checkNumeracion($documento);

        /**
         * TODO: HACER ESTO PROCESOS EN BACKGROUND
         */
        $consejo = $documento->consejo;

        $consejoData = [
            Variables::FECHA => $this->formatDate($consejo->fecha),
            Variables::FECHAUP => $this->formatDateText($consejo->fecha),
            Variables::SESION => $this->textToUpperLower($consejo->tipoConsejo->nombre, "lower"),
            Variables::RESPONSABLE => $consejo->responsable->docente->nombres,
        ];

        $generalData = [
            Variables::CREADOPOR => auth()->user()->name,
            Variables::NUMDOC => $numDoc,
        ];

        $estudianteData = [];
        $estudiante = $documento->estudiante;

        if ($estudiante) {
            $estudianteFullName = implode(' ', [$estudiante->nombres, $estudiante->apellidos]);
            $carrera = $estudiante->carrera;

            $now = now();

            $estudianteData = [
                Variables::ESTUDIANTE => mb_convert_encoding(mb_convert_case($estudianteFullName, MB_CASE_TITLE), 'UTF-8'),
                Variables::ESTUDIANTEUP => mb_strtoupper($estudianteFullName, 'UTF-8'),
                Variables::CEDULA => $estudiante->cedula,
                Variables::MATRICULA => $estudiante->matricula,
                Variables::FOLIO => $estudiante->folio,
                Variables::TELEFONO => $estudiante->telefono,
                Variables::CELULAR => $estudiante->celular,
                Variables::CORREO => $estudiante->correo,
                Variables::CORREOUTA => $estudiante->correo_uta,
                Variables::NOMBRECARRERA => $carrera->nombre,
                Variables::NOMBRECARRERAUP => mb_strtoupper($carrera->nombre, 'UTF-8'),
                Variables::COORDINADOR => $carrera->coordinador,
                Variables::YEAR => $this->format_Y($now),
            ];
        }

        $docentes = $documento->docentes->map(function ($docente, $i) {
            $key = str_replace('$i', $i, Variables::DOCENTE_N);
            return [$key => $docente->nombres];
        })->collapse()->toArray();

        $cargos = Cargo::query()->with(['docente'])->get()->map(function ($i, $k) {
            return [$i['variable'] => $i['docente']['nombres']];
        })->collapse()->toArray();

        //
        $this->googleDrive->replaceTextOnDocument(
            array_merge(
                $generalData,
                $estudianteData,
                $consejoData,
                $docentes,
                $cargos,
            ),
            $documentoDrive->id,
        );

        //
        $documento->update([
            'variables' => [
                Variables::PREFEX_GENERAL => $generalData,
                Variables::PREFIX_ESTUDIANTE => $estudianteData,
                Variables::PREFIX_CONSEJO => $consejoData,
                Variables::PREFIX_DOCENTES => $docentes,
            ],
        ]);
    }
}
