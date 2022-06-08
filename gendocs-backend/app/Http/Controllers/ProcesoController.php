<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProcesoRequest;
use App\Http\Requests\UpdateProcesoRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Directorio;
use App\Models\Module;
use App\Models\Proceso;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ProcesoController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Proceso::class);
    }

    public function index(Request $request)
    {
        $query = Proceso::query()->fromActiveDirectory();

        $query->orderBy('estado', 'DESC');
        $query->orderBy('nombre');

        $query->applyFilters($request->all());

        $paginate = $query->applyPaginate($request->all());

        if ($paginate['isPageable']) {
            return ResourceCollection::make(
                $query->paginate($paginate['size'], '*', $paginate['param'], $paginate['number'])
            );
        }

        return ResourceCollection::make($query->get());
    }

    public function store(StoreProcesoRequest $request)
    {
        $validated = $request->validated();

        try {

            $proceso = Proceso::create([
                'nombre' => $validated['nombre'],
                'estado' => $validated['estado'],
                'module_id' => Module::query()->where('code', $validated['module'])->first()->id,
                'directorio_id' => Directorio::query()->activeDirectory()->id,
            ]);

            return ResourceObject::make($proceso);
        } catch (\Exception $e) {
            return response()->json([
                'errors' => $e->getMessage(),
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function show(Proceso $proceso)
    {
        return ResourceObject::make($proceso);
    }

    public function update(UpdateProcesoRequest $request, Proceso $proceso)
    {
        $validated = $request->validated();

        try {
            $proceso->fill($validated);

            if ($proceso->isDirty()) {
                $proceso->save();
            }

            return ResourceObject::make($proceso);
        } catch (\Exception $e) {
            return response()->json([
                'errors' => $e->getMessage(),
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function destroy(Proceso $proceso)
    {
        //
    }
}
