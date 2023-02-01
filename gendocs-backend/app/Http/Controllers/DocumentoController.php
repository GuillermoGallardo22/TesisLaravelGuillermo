<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDocumentoRequest;
use App\Http\Requests\UpdateDocumentoRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Documento;
use App\Services\DocumentoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class DocumentoController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Documento::class);
    }

    public function index(Request $request)
    {
        $query = Documento::query();

        $query->orderBy('numero', 'DESC');

        $query->applyFilters($request->all());

        $paginate = $query->applyPaginate($request->all());

        if ($paginate['isPageable']) {
            return ResourceCollection::make(
                $query->paginate($paginate['size'], '*', $paginate['param'], $paginate['number'])
            );
        }

        return ResourceCollection::make($query->get());
    }

    public function store(StoreDocumentoRequest $request, DocumentoService $service)
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();

            $documento = Documento::create([
                'consejo_id' => $validated['consejo'],
                'estudiante_id' => $validated['estudiante'],
                'numero' => $validated['numero'],
                'plantilla_id' => $validated['plantilla'],
                'autor_id' => $request->user()->id,
                'descripcion' => $validated['descripcion']
            ]);

            if (count($validated['docentes'])) {
                $documento->docentes()->attach($validated['docentes']);
            }

            $service->generar($documento);

            DB::commit();

            return ResourceObject::make($documento);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'errors' => $e->getMessage(),
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function show(Documento $documento)
    {
        //
    }

    public function update(UpdateDocumentoRequest $request, Documento $documento)
    {
        //
    }

    public function destroy(Documento $documento)
    {
        try {
            DB::beginTransaction();
            $documento->delete();
            DB::commit();
            return response()->noContent(ResponseAlias::HTTP_OK);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'errors' => $e->getMessage(),
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }
    }
}
