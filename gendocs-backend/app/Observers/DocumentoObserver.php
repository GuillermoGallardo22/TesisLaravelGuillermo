<?php

namespace App\Observers;

use App\Constants\Variables;
use App\Models\Documento;
use App\Models\Numeracion;
use App\Services\GoogleDriveService;
use App\Services\NumeracionService;
use App\Traits\Nameable;
use App\Traits\ReplaceableDocText;

class DocumentoObserver
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

    /**
     * Handle the Documento "created" event.
     *
     * @param \App\Models\Documento $documento
     * @return void
     */
    public function created(Documento $documento)
    {
        $documentoDrive = $this->googleDrive->copyFile(
            $this
                ->setNumber($documento->numero)
                ->generateNameFile(),
            $documento->consejo->directorio->google_drive_id,
            $documento->plantilla->archivo->google_drive_id,
        );

        $documento->archivo()->create([
            'google_drive_id' => $documentoDrive->id,
        ]);

        $this->numeracionService
            ->setDocumento($documento)
            ->checkNumeracion();

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
            Variables::NUMDOC => str_pad($documento->numero, 4, '0', STR_PAD_LEFT),
        ];

        $estudianteData = [];
        $estudiante = $documento->estudiante;

        if ($estudiante) {
            $estudianteFullName = implode(' ', [$estudiante->nombres, $estudiante->apellidos]);
            $carrera = $estudiante->carrera;

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
            ];
        }

        $this->googleDrive->replaceTextOnDocument(
            array_merge($generalData, $estudianteData, $consejoData),
            $documentoDrive->id,
        );

        $documento->update([
            'variables' => [
                Variables::PREFEX_GENERAL => $generalData,
                Variables::PREFIX_ESTUDIANTE => $estudianteData,
                Variables::PREFIX_CONSEJO => $consejoData,
            ],
        ]);
    }

    /**
     * Handle the Documento "updated" event.
     *
     * @param \App\Models\Documento $documento
     * @return void
     */
    public function updated(Documento $documento)
    {
        //
    }

    /**
     * Handle the Documento "deleted" event.
     *
     * @param \App\Models\Documento $documento
     * @return void
     */
    public function deleted(Documento $documento)
    {
        $numeracion = Numeracion::where('numero', $documento->numero)->first();

        $numeracion->update([
            'usado' => false,
            'encolado' => true,
        ]);
    }

    /**
     * Handle the Documento "restored" event.
     *
     * @param \App\Models\Documento $documento
     * @return void
     */
    public function restored(Documento $documento)
    {
        //
    }

    /**
     * Handle the Documento "force deleted" event.
     *
     * @param \App\Models\Documento $documento
     * @return void
     */
    public function forceDeleted(Documento $documento)
    {
        //
    }
}
