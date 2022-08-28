<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResourceCollection;
use App\Models\EstadoActa;
use Illuminate\Http\Request;

class EstadoActaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = EstadoActa::query();
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
     * @param  \App\Models\EstadoActa  $estadoActa
     * @return \Illuminate\Http\Response
     */
    public function show(EstadoActa $estadoActa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EstadoActa  $estadoActa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EstadoActa $estadoActa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EstadoActa  $estadoActa
     * @return \Illuminate\Http\Response
     */
    public function destroy(EstadoActa $estadoActa)
    {
        //
    }
}
