<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActaRequest;
use App\Http\Requests\UpdateActaRequest;
use App\Models\Acta;

class ActaController extends Controller
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
     * @param  \App\Http\Requests\StoreActaRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreActaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Acta  $acta
     * @return \Illuminate\Http\Response
     */
    public function show(Acta $acta)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Acta  $acta
     * @return \Illuminate\Http\Response
     */
    public function edit(Acta $acta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateActaRequest  $request
     * @param  \App\Models\Acta  $acta
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateActaRequest $request, Acta $acta)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Acta  $acta
     * @return \Illuminate\Http\Response
     */
    public function destroy(Acta $acta)
    {
        //
    }
}
