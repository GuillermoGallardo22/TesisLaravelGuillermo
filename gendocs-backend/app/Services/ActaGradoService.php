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
        // LEER CELDAS
        $celdas = $plantilla->tipoActaGrado->celdasNotas->sortBy([
            ["id", "asc"]
        ]);

        $notas = $celdas->map(function ($item) use ($actaGrado) {
            $values = $this->googleDrive->getValues($actaGrado->documento_notas, "Sheet1!" . $item->celda);
            $values = collect($values?->getValues() ?? [])->flatten();

            $value = $values->count() > 0 ? $values->toArray()[0] : "0.0";

            $words = $this->converNumberToWords($value);

            usleep(config("services.google.timeout_processing"));

            return [
                // "id" => $item->id,
                // "celda" => $item->celda,
                // "variable_nota" => $item->variable_nota,
                // "variable_nota_texto" => $item->variable_nota_texto,
                // "valor_nota" => $value,
                // "valor_nota_texto" => $words,
                "{{{$item->variable_nota}}}" => $value,
                "{{{$item->variable_nota_texto}}}" => $words,
            ];
        })->collapse()->toArray();

        // CREAR DOCUMENTO FINAL

        $documentoDrive = $this->googleDrive->copyFile(
            $actaGrado->estudiante->cedula . " | " . $actaGrado->tipo->codigo,
            Directorio::activeDirectory()->directorio_id,
            $plantilla->archivo->google_drive_id,
        );

        $actaGrado->documento = $documentoDrive->id;

        $actaGrado->save();

        // REEMPLAZAR

        $this->googleDrive->replaceTextOnDocument(
            array_merge(
                $notas,
            ),
            $documentoDrive->id,
        );

        return $actaGrado;
    }
}
