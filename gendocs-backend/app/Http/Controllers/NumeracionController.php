<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservaRequest;
use App\Http\Resources\ResourceObject;
use App\Models\Consejo;
use App\Models\Directorio;
use App\Models\Module;
use App\Models\Numeracion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class NumeracionController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Numeracion::class);
    }

    public function index(Request $request)
    {
        $queryParams = $request->all();

        if (!$request->exists('filter.module')) {
            return response()->json([
                'data' => [
                    'siguiente' => -1,
                    'reservados' => [],
                    'encolados' => [],
                ]
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }

        $baseQuery = Numeracion::query()->fromActiveDirectory();

        $baseQuery->applyFilters($queryParams);

        return response()->json([
            'data' => [
                'siguiente' => (clone $baseQuery)->siguiente(),
                'reservados' => (clone $baseQuery)->reservados()->get(),
                'encolados' => (clone $baseQuery)->encolados()->get(),
            ]
        ]);
    }

    public function store(StoreReservaRequest $request)
    {
        $validated = $request->validated();

        $desde = $validated['desde'];
        $hasta = $validated['hasta'];
        $consejo_id = $validated['consejo'];
        $moduleCode = $validated['module'];

        try {
            DB::beginTransaction();

            for ($i = $desde; $i <= $hasta; $i++) {
                Numeracion::create([
                    'numero' => $i,
                    'reservado' => true,
                    'consejo_id' => $consejo_id,
                    'module_id' => Module::where('code', $moduleCode)->first()->id,
                    'directorio_id' => Directorio::activeDirectory()->id,
                ]);
            }

            DB::commit();

            return response()->noContent(ResponseAlias::HTTP_CREATED);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'errors' => $e->getMessage(),
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function destroy(Numeracion $numeracion)
    {
        $numeracion->update([
            'usado' => false,
            'encolado' => true,
            'reservado' => false,
            'consejo_id' => null,
        ]);

        return response()->noContent(ResponseAlias::HTTP_OK);
    }
}
