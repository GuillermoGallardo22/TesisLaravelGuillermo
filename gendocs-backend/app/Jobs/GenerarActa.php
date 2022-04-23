<?php

namespace App\Jobs;

use App\Constants\MimeType;
use App\Constants\Variables;
use App\Models\Consejo;
use App\Models\Documento;
use App\Services\GoogleDriveService;
use App\Traits\DocumentGenerable;
use App\Traits\ReplaceableDocText;
use Carbon\Carbon;
use DOMDocument;
use Exception;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\TemplateProcessor;
use ZipArchive;

class GenerarActa implements ShouldQueue, ShouldBeUnique
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels, ReplaceableDocText, DocumentGenerable;

    protected Documento $documento;
    protected Consejo $consejo;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Consejo $consejo, Documento $documento)
    {
        $this->documento = $documento;
        $this->consejo = $consejo;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle(GoogleDriveService $service)
    {
        $consejo = $this->consejo;
        $documento = $this->documento;

        $baseDir = $consejo->nombre;

        // DOWNLOAD FILES
        $response = $service->exportFile(
            $documento->archivo->google_drive_id,
            MimeType::DOCX,
        );

        $numDoc = $this->formatDocNumber($documento->numero);

        // "0001.docx"
        $downloadedDocument = $numDoc . ".docx";

        Storage::put(
            $baseDir . "/descargados/" . $downloadedDocument,
            $response->getBody()
        );

        $zip = new ZipArchive();
        $year = Carbon::now()->format('Y');

        // "app/NOMBRE_CONSEJO/temp"
        $dirTemp = storage_path('app/' . $baseDir . "/temp");

        $filePath = storage_path('app/' . $baseDir . "/descargados/" . $downloadedDocument,);

        // EXTRACT .docx
        if ($zip->open($filePath) === TRUE) {
            $zip->extractTo($dirTemp);
            $zip->close();
        } else {
            throw new Exception(
                "No se pudo descomprimir el archivo " . $downloadedDocument . "\n"
            );
        }

        $wordDir = $dirTemp . "/word";
        $documentXMLPath = $wordDir . "/document.xml";

        // RED FILE CONTENT
        $dom = new DOMDocument();
        $dom->load($documentXMLPath);

        $document = $dom->documentElement;
        $body = $document->getElementsByTagName('body')[0];

        // REMOVE UNNECESARY CONTENT
        for ($i = 0; $i < $body->childNodes->count(); $i++) {

            $element = $body->childNodes[$i];
            $textContent = $element->nodeValue;

            if ($textContent === Variables::FROM) {
                $body->removeChild($element);
                break;
            } else {
                $i--;
                $body->removeChild($element);
            }
        }

        for ($i = $body->childNodes->count() - 1; $i >= 0; $i--) {

            $element = $body->childNodes[$i];

            $textContent = $element->nodeValue;

            if ($textContent === Variables::TO) {
                $body->removeChild($element);
                break;
            } else {
                $body->removeChild($element);
            }
        }

        // REPLACE NEW CONTENT
        file_put_contents(
            $documentXMLPath,
            $dom->saveXML(),
        );

        // CLEAN HEADER
        $this->cleanFileContent($wordDir . "/header*.xml");

        // CLEAN FOOTER
        $this->cleanFileContent($wordDir . "/footer*.xml");

        // MAKE NEW FILE

        // "0001-B.docx"
        $outFileName = $numDoc . '-B' . '.docx';
        $filePathDocContent = storage_path("app/" . $baseDir . "/generados/" . $outFileName);

        $this->zipRecursive($dirTemp, $filePathDocContent);

        // ADD TITLE
        $templateProcessor = new TemplateProcessor(storage_path("app/" . $baseDir . '/separador.docx'));
        $templateProcessor->setValues([
            'Y' => $year,
            'NUMDOC' => $numDoc,
        ]);

        // "0001-A.docx"
        $nameDocTitle = $numDoc . '-A' . '.docx';
        $filePathDocTitle = storage_path("app/" . $baseDir . "/generados/" . $nameDocTitle);

        $templateProcessor->saveAs($filePathDocTitle);

        // REMOVE TEMP DIR
        $this->deleteRecursive($dirTemp);
    }
}
