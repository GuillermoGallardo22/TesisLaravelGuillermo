<?php

namespace App\Observers;

use App\Models\Documento;
use App\Services\GoogleDriveService;
use App\Services\NumeracionService;
use App\Traits\Nameable;
use Carbon\Carbon;

class DocumentoObserver
{
    use Nameable;

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

        // SEGUNDO PLANO

        $consejo = $documento->consejo;
        $consejoFecha = Carbon::parse($consejo->fecha)->locale('es');

        $generalData = [
            '{{FECHA}}' => $consejoFecha->format('d/m/Y'),
            '{{FECHAUP}}' => $consejoFecha->translatedFormat('d \d\e F \d\e Y'),
            '{{CREADOPOR}}' => auth()->user()->name,
            '{{NUMDOC}}' => str_pad($documento->numero, 4, '0', STR_PAD_LEFT),
            '{{SESION}}' => strtolower($consejo->tipoConsejo->nombre),
            // '{{RESPONSABLE}}' => $request->responsable,
        ];

        $estudianteData = [];
        $estudiante = $documento->estudiante;

        if ($estudiante) {
            $estudianteFullName = implode(' ', [$estudiante->nombres, $estudiante->apellidos]);
            $carrera = $estudiante->carrera;

            $estudianteData = [
                '{{ESTUDIANTE}}' => mb_convert_encoding(mb_convert_case($estudianteFullName, MB_CASE_TITLE), 'UTF-8'),
                '{{ESTUDIANTEUP}}' => mb_strtoupper($estudianteFullName, 'UTF-8'),
                '{{CEDULA}}' => $estudiante->cedula,
                '{{MATRICULA}}' => $estudiante->matricula,
                '{{FOLIO}}' => $estudiante->folio,
                '{{TELEFONO}}' => $estudiante->telefono,
                '{{CELULAR}}' => $estudiante->celular,
                '{{CORREO}}' => $estudiante->correo,
                '{{CORREOUTA}}' => $estudiante->correo_uta,
                '{{NOMBRECARRERA}}' => $carrera->nombre,
                '{{NOMBRECARRERAUP}}' => mb_strtoupper($carrera->nombre, 'UTF-8'),
            ];
        }

        $data = array_merge($generalData, $estudianteData);

        $this->googleDrive->generateDoc(
            $data,
            $documentoDrive->id,
        );
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
        //
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
