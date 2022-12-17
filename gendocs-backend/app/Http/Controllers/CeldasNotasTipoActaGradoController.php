<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCeldasNotasTipoActaGradoRequest;
use App\Http\Requests\UpdateCeldasNotasTipoActaGradoRequest;
use App\Http\Resources\CeldasNotasTipoActaGradoResource;
use App\Models\CeldasNotasTipoActaGrado;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class CeldasNotasTipoActaGradoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = CeldasNotasTipoActaGrado::query();

        $query->orderBy('created_at', 'DESC');

        $query->applyFilters($request->all());

        return CeldasNotasTipoActaGradoResource::collection($query->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCeldasNotasTipoActaGradoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCeldasNotasTipoActaGradoRequest $request)
    {
        $validated = $request;

        $celdaNota = CeldasNotasTipoActaGrado::create([
            "tipo_acta_grado_id" => $validated["tipo_acta_grado"],
            "celda" => $validated["celda"],
            "descripcion" => $validated["descripcion"],
        ]);

        return CeldasNotasTipoActaGradoResource::make($celdaNota);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CeldasNotasTipoActaGrado  $celdasNotasTipoActaGrado
     * @return \Illuminate\Http\Response
     */
    public function show(CeldasNotasTipoActaGrado $celdasNotasTipoActaGrado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\CeldasNotasTipoActaGrado  $celdasNotasTipoActaGrado
     * @return \Illuminate\Http\Response
     */
    public function edit(CeldasNotasTipoActaGrado $celdasNotasTipoActaGrado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCeldasNotasTipoActaGradoRequest  $request
     * @param  \App\Models\CeldasNotasTipoActaGrado  $celdasNotasTipoActaGrado
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCeldasNotasTipoActaGradoRequest $request, CeldasNotasTipoActaGrado $celdasNotasTipoActaGrado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CeldasNotasTipoActaGrado  $celdasNotasTipoActaGrado
     * @return \Illuminate\Http\Response
     */
    public function destroy(CeldasNotasTipoActaGrado $celdasNotaTipoActaGrado)
    {
        $celdasNotaTipoActaGrado->delete();

        return response()->noContent(ResponseAlias::HTTP_OK);
    }
}
