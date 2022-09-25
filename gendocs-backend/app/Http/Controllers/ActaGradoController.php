<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreActaGradoRequest;
use App\Http\Requests\UpdateActaGradoRequest;
use App\Http\Resources\ResourceCollection;
use App\Models\ActaGrado;
use Illuminate\Http\Request;

class ActaGradoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = ActaGrado::query();

        $query->applyFilters($request->all());

        return ResourceCollection::make($query->get());
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
     * @param  \App\Http\Requests\StoreActaGradoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreActaGradoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return \Illuminate\Http\Response
     */
    public function show(ActaGrado $actaGrado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return \Illuminate\Http\Response
     */
    public function edit(ActaGrado $actaGrado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateActaGradoRequest  $request
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateActaGradoRequest $request, ActaGrado $actaGrado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return \Illuminate\Http\Response
     */
    public function destroy(ActaGrado $actaGrado)
    {
        //
    }
}
