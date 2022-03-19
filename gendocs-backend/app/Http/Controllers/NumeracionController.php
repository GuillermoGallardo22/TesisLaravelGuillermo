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

    public function checkNumeracionConsejo($consejo, $numero)
    {
        $consejo = Consejo::find($consejo);

        if (!$consejo) {
            return response()->json([
                'errors' => trans('validation.exists')
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }

        $existsConsejoInNumeracion = Numeracion::where('consejo_id', $consejo->id)->exists();

        if ($existsConsejoInNumeracion) {
            $isValid = Numeracion::query()
                ->where('consejo_id', $consejo->id)
                ->where('numero', $numero)
                ->exists();

            if ($isValid) {
                return response()->noContent(ResponseAlias::HTTP_OK);
            } else {
                return response()->json([
                    'errors' => trans('validation.custom.documento.create.numero.numeroConsejoInconsistente')
                ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
            }
        }
    }
}
