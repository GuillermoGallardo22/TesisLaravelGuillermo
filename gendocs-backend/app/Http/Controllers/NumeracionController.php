<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservaRequest;
use App\Http\Resources\ResourceObject;
use App\Models\Consejo;
use App\Models\Numeracion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class NumeracionController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => [
                'siguiente' => Numeracion::query()->siguiente(),
                'reservados' => Numeracion::query()->reservados(),
                'encolados' => Numeracion::query()->encolados(),
            ]
        ]);
    }

    public function store(StoreReservaRequest $request)
    {
        $validated = $request->validated();

        $desde = $validated['desde'];
        $hasta = $validated['hasta'];
        $consejo_id = $validated['consejo'];

        try {
            DB::beginTransaction();

            for ($i = $desde; $i <= $hasta; $i++) {
                Numeracion::create([
                    'numero' => $i,
                    'reservado' => true,
                    'consejo_id' => $consejo_id,
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
}
