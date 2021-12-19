<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMiembroRequest;
use App\Http\Requests\UpdateMiembroRequest;
use App\Models\Miembro;

class MiembroController extends Controller
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
     * @param  \App\Http\Requests\StoreMiembroRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreMiembroRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Miembro  $miembro
     * @return \Illuminate\Http\Response
     */
    public function show(Miembro $miembro)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Miembro  $miembro
     * @return \Illuminate\Http\Response
     */
    public function edit(Miembro $miembro)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateMiembroRequest  $request
     * @param  \App\Models\Miembro  $miembro
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMiembroRequest $request, Miembro $miembro)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Miembro  $miembro
     * @return \Illuminate\Http\Response
     */
    public function destroy(Miembro $miembro)
    {
        //
    }
}
