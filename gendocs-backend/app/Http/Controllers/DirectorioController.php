<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDirectorioRequest;
use App\Http\Requests\UpdateDirectorioRequest;
use App\Models\Directorio;

class DirectorioController extends Controller
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
     * @param  \App\Http\Requests\StoreDirectorioRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDirectorioRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Directorio  $directorio
     * @return \Illuminate\Http\Response
     */
    public function show(Directorio $directorio)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Directorio  $directorio
     * @return \Illuminate\Http\Response
     */
    public function edit(Directorio $directorio)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDirectorioRequest  $request
     * @param  \App\Models\Directorio  $directorio
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDirectorioRequest $request, Directorio $directorio)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Directorio  $directorio
     * @return \Illuminate\Http\Response
     */
    public function destroy(Directorio $directorio)
    {
        //
    }
}
