<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreParametroValorRequest;
use App\Http\Requests\UpdateParametroValorRequest;
use App\Models\ParametroValor;

class ParametroValorController extends Controller
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
     * @param  \App\Http\Requests\StoreParametroValorRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreParametroValorRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ParametroValor  $parametroValor
     * @return \Illuminate\Http\Response
     */
    public function show(ParametroValor $parametroValor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ParametroValor  $parametroValor
     * @return \Illuminate\Http\Response
     */
    public function edit(ParametroValor $parametroValor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateParametroValorRequest  $request
     * @param  \App\Models\ParametroValor  $parametroValor
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateParametroValorRequest $request, ParametroValor $parametroValor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ParametroValor  $parametroValor
     * @return \Illuminate\Http\Response
     */
    public function destroy(ParametroValor $parametroValor)
    {
        //
    }
}
