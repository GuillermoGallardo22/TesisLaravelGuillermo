<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlantillasRequest;
use App\Http\Requests\UpdatePlantillasRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Plantillas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class PlantillasController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Plantillas::class, 'plantilla');
    }


    public function index(Request $request)
    {
        $query = Plantillas::query();

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

    public function store(StorePlantillasRequest $request)
    {
        $validated = $request->validated();

        try {
            $plantilla = new Plantillas($validated);
            $plantilla->proceso_id = $validated['proceso'];
            $plantilla->user_id = \request()->user()->id;

            $plantilla->save();

            return ResourceObject::make($plantilla);
        } catch (\Exception $e) {
            return response()->json([
                'errors' => $e->getMessage(),
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function show(Plantillas $plantilla)
    {
        return ResourceObject::make($plantilla);
    }

    public function update(UpdatePlantillasRequest $request, Plantillas $plantilla)
    {
        try {
            DB::beginTransaction();

            $validated = $request->validated();

            $plantilla->fill([
                'nombre' => $validated['nombre'],
                'estado' => $validated['estado'],
                'proceso_id' => $validated['proceso'],
            ]);

            $plantilla->save();

            DB::commit();
            return ResourceObject::make($plantilla);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    public function destroy(Plantillas $plantilla)
    {
        //
    }
}
