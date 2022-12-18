<?php

namespace App\Services;

use App\Constants\MimeType;
use App\Constants\Variables;
use App\Models\ActaGrado;
use App\Models\Cargo;
use App\Models\Directorio;
use App\Models\Documento;
use App\Models\TipoEstadoActaGrado;
use App\Traits\Nameable;
use App\Traits\ReplaceableDocText;
use Illuminate\Support\Facades\Log;

class ActaGradoService
{
    use Nameable, ReplaceableDocText;

    protected GoogleDriveService $googleDrive;

    /**
     * @param GoogleDriveService $googleDrive
     */
    public function __construct(GoogleDriveService $googleDrive)
    {
        $this->googleDrive = $googleDrive;
    }

    public function generarDocumentoNotas(ActaGrado $actaGrado)
    {
        $documentoDrive = $this->googleDrive->copyFile(
            $actaGrado->estudiante->cedula . " | " . $actaGrado->tipo->codigo,
            Directorio::activeDirectory()->directorio_id,
            $actaGrado->tipo->archivo->google_drive_id,
        );

        $actaGrado->documento_notas = $documentoDrive->id;

        $actaGrado->save();

        return $actaGrado;
    }

    public function generarDocumento(ActaGrado $actaGrado, TipoEstadoActaGrado $plantilla)
    {
        $documentoDrive = $this->googleDrive->copyFile(
            $actaGrado->estudiante->cedula . " | " . $actaGrado->tipo->codigo,
            Directorio::activeDirectory()->directorio_id,
            $plantilla->archivo->google_drive_id,
        );

        $actaGrado->documento = $documentoDrive->id;

        $actaGrado->save();

        return $actaGrado;
    }
}
