<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlantillasRequest;
use App\Http\Requests\UpdatePlantillasRequest;
use App\Models\Plantillas;

class PlantillasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StorePlantillasRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePlantillasRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Plantillas  $plantillas
     * @return \Illuminate\Http\Response
     */
    public function show(Plantillas $plantillas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Plantillas  $plantillas
     * @return \Illuminate\Http\Response
     */
    public function edit(Plantillas $plantillas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePlantillasRequest  $request
     * @param  \App\Models\Plantillas  $plantillas
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePlantillasRequest $request, Plantillas $plantillas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Plantillas  $plantillas
     * @return \Illuminate\Http\Response
     */
    public function destroy(Plantillas $plantillas)
    {
        //
    }
}
