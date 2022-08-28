<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResourceCollection;
use App\Models\Canton;
use Illuminate\Http\Request;

class CantonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Canton::query();

        $query
            ->orderBy('nombre');

        $query->applyFilters($request->all());

        return ResourceCollection::make($query->get());
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
     * @param  \App\Models\Canton  $canton
     * @return \Illuminate\Http\Response
     */
    public function show(Canton $canton)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Canton  $canton
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Canton $canton)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Canton  $canton
     * @return \Illuminate\Http\Response
     */
    public function destroy(Canton $canton)
    {
        //
    }
}
