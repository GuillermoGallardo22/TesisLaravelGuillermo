<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConsejoRequest;
use App\Http\Requests\UpdateConsejoRequest;
use App\Models\Consejo;

class ConsejoController extends Controller
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
     * @param  \App\Http\Requests\StoreConsejoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreConsejoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Consejo  $consejo
     * @return \Illuminate\Http\Response
     */
    public function show(Consejo $consejo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Consejo  $consejo
     * @return \Illuminate\Http\Response
     */
    public function edit(Consejo $consejo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateConsejoRequest  $request
     * @param  \App\Models\Consejo  $consejo
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateConsejoRequest $request, Consejo $consejo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Consejo  $consejo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Consejo $consejo)
    {
        //
    }
}
