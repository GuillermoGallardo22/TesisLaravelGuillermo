<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCarreraRequest;
use App\Http\Requests\UpdateCarreraRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Carrera;
use Illuminate\Http\Request;

class CarreraController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Carrera::class);
    }

    public function index(Request $request)
    {
        $query = Carrera::query();
        $query->orderBy('nombre', 'asc');

        $query->applyFilters($request->all());

        return ResourceCollection::make($query->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreCarreraRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCarreraRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Carrera $carrera
     * @return \Illuminate\Http\Response
     */
    public function show(Carrera $carrera)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Carrera $carrera
     * @return \Illuminate\Http\Response
     */
    public function edit(Carrera $carrera)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateCarreraRequest $request
     * @param \App\Models\Carrera $carrera
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCarreraRequest $request, Carrera $carrera)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Carrera $carrera
     * @return \Illuminate\Http\Response
     */
    public function destroy(Carrera $carrera)
    {
        //
    }
}
