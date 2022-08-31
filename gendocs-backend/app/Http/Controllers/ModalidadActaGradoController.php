<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResourceCollection;
use App\Models\ModalidadActaGrado;
use Illuminate\Http\Request;

class ModalidadActaGradoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $q = ModalidadActaGrado::query();

        return ResourceCollection::make($q->get());
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
     * @param  \App\Models\ModalidadActaGrado  $modalidadActaGrado
     * @return \Illuminate\Http\Response
     */
    public function show(ModalidadActaGrado $modalidadActaGrado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ModalidadActaGrado  $modalidadActaGrado
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ModalidadActaGrado $modalidadActaGrado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ModalidadActaGrado  $modalidadActaGrado
     * @return \Illuminate\Http\Response
     */
    public function destroy(ModalidadActaGrado $modalidadActaGrado)
    {
        //
    }
}
