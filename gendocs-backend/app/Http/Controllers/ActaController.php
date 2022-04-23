<?php

namespace App\Http\Controllers;

use App\Constants\MimeType;
use App\Http\Requests\StoreActaRequest;
use App\Http\Requests\UpdateActaRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Jobs\GenerarActa;
use App\Models\Acta;
use App\Models\Consejo;
use DocxMerge\DocxMerge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ActaController extends Controller
{
    public function index(Request $request)
    {
        $query = Acta::query();

        $query->applyFilters($request->all());

        return ResourceCollection::make($query->get());
    }

    public function store(StoreActaRequest $request)
    {
        $validated = $request->validated();

        $consejo = Consejo::find($validated['consejo']);

        $acta = $consejo->acta;

        $acta?->delete();

        $acta = $consejo->acta()->updateOrCreate([
            'consejo_id' => $consejo->id,
        ], [
            'consejo_id' => $consejo->id,
        ]);

        return ResourceObject::make($acta);
    }

    public function show(Acta $acta)
    {
        //
    }

    public function update(UpdateActaRequest $request, Acta $acta)
    {
        //
    }

    public function destroy(Acta $acta)
    {
        //
    }

    public function descargar(Acta $acta)
    {
        $dir = $acta->output_path;
        $files = glob(storage_path("app/" . $dir) . '/generados/*.docx');

        if (!count($files)) {
            return response()->noContent(Response::HTTP_NOT_FOUND);
        }

        $file = "/unificado.docx";

        $dm = new DocxMerge();
        $dm->merge($files, storage_path("app/" . $dir . $file));

        $contentType = MimeType::DOCX;

        return Storage::download($dir . $file, pathinfo($file)['basename'], ["Content-Type: $contentType"]);
    }
}
