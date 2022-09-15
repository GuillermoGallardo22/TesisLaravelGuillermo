<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResourceCollection;
use App\Models\TipoActaGrado;
use Illuminate\Http\Request;

class TipoActaGradoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = TipoActaGrado::query();

        $query->orderBy('nombre');

        $query->applyFilters($request->all());

        return ResourceCollection::make($query->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TipoActaGrado  $tipoActaGrado
     * @return \Illuminate\Http\Response
     */
    public function show(TipoActaGrado $tipoActaGrado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TipoActaGrado  $tipoActaGrado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TipoActaGrado $tipoActaGrado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TipoActaGrado  $tipoActaGrado
     * @return \Illuminate\Http\Response
     */
    public function destroy(TipoActaGrado $tipoActaGrado)
    {
        //
    }
}
