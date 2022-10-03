<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNumeracionActaGradoRequest;
use App\Http\Requests\UpdateNumeracionActaGradoRequest;
use App\Models\NumeracionActaGrado;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class NumeracionActaGradoController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(NumeracionActaGrado::class);
    }

    public function index(Request $request)
    {
        $queryParams = $request->all();

        // VALIDAR SIEMPRE BUSCAR POR CARRERA
        if (!$request->exists('filter.carrera')) {
            return response()->json([
                'data' => [
                    'siguiente' => -1,
                    'encolados' => [],
                ]
            ], Response::HTTP_BAD_REQUEST);
        }

        $baseQuery = NumeracionActaGrado::query();
        $baseQuery->applyFilters($queryParams);

        // VALIDAR SIEMPRE EXISTA AL MENOS UN REGISTRO
        if (!(clone $baseQuery)->get()->count()) {
            return response()->json([
                'data' => [
                    'siguiente' => -1,
                    'encolados' => [],
                ]
            ], Response::HTTP_BAD_REQUEST);
        }

        return response()->json([
            'data' => [
                'siguiente' => (clone $baseQuery)->siguiente(),
                'encolados' => (clone $baseQuery)->encolados()->get(),
            ]
        ]);
    }

    public function store(StoreNumeracionActaGradoRequest $request)
    {
        //
    }

    public function show(NumeracionActaGrado $numeracionActaGrado)
    {
        //
    }

    public function update(UpdateNumeracionActaGradoRequest $request, NumeracionActaGrado $numeracionActaGrado)
    {
        //
    }

    public function destroy(NumeracionActaGrado $numeracionActaGrado)
    {
        //
    }
}
