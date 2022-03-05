<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTipoConsejoRequest;
use App\Http\Requests\UpdateTipoConsejoRequest;
use App\Http\Resources\ResourceCollection;
use App\Models\TipoConsejo;

class TipoConsejoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = TipoConsejo::query();
        return ResourceCollection::make($query->orderBy('nombre')->get());
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
     * @param \App\Http\Requests\StoreTipoConsejoRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTipoConsejoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\TipoConsejo $tipoConsejo
     * @return \Illuminate\Http\Response
     */
    public function show(TipoConsejo $tipoConsejo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\TipoConsejo $tipoConsejo
     * @return \Illuminate\Http\Response
     */
    public function edit(TipoConsejo $tipoConsejo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateTipoConsejoRequest $request
     * @param \App\Models\TipoConsejo $tipoConsejo
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTipoConsejoRequest $request, TipoConsejo $tipoConsejo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\TipoConsejo $tipoConsejo
     * @return \Illuminate\Http\Response
     */
    public function destroy(TipoConsejo $tipoConsejo)
    {
        //
    }
}
