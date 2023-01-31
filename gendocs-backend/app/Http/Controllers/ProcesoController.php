<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProcesoRequest;
use App\Http\Requests\UpdateProcesoRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Directorio;
use App\Models\Documento;
use App\Models\Module;
use App\Models\Plantillas;
use App\Models\Proceso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
                'directorio_id' => Directorio::query()->activeDirectory()->id,
            ]);

            $proceso->module()->create([
                'module_id' => Module::query()->where('code', $validated['module'])->first()->id,
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

    public function generarReporte(Request $request)
    {
        $proceso = $request->get('proceso');
        // $modulo = $request->get('modulo');
        $fecha_inicio = $request->get('fi');
        $fecha_fin = $request->get('ff');

        // $query = Documento::query();

        // $query
        //     ->whereHas('plantilla', function ($query) use ($proceso) {
        //         $query->whereHas('proceso', function ($query) use ($proceso) {
        //             $query->where('id', $proceso);
        //         });
        //     })
        //     ->whereBetween("created_at", [$fecha_inicio, $fecha_fin]);

        $query = DB::table((new Documento())->getTable(), 'd')
            ->selectRaw('pl.id, pl.nombre, COUNT(d.plantilla_id) as total')
            ->join((new Plantillas())->getTable() . " as pl", 'pl.id', '=', 'd.plantilla_id')
            ->join((new Proceso())->getTable() . " as pr", 'pr.id', '=', 'pl.proceso_id')
            ->whereBetween('d.created_at', [$fecha_inicio, $fecha_fin])
            ->where('pr.id', $proceso)
            ->groupBy(['pl.id', 'pl.nombre']);

        return response()->json([
            "data" => $query->get(),
        ]);
    }
}
