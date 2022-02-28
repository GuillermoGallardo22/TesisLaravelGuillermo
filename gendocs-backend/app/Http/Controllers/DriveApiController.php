<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDriveApiRequest;
use App\Http\Requests\UpdateDriveApiRequest;
use App\Models\DriveApi;

class DriveApiController extends Controller
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
     * @param  \App\Http\Requests\StoreDriveApiRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreDriveApiRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\DriveApi  $driveApi
     * @return \Illuminate\Http\Response
     */
    public function show(DriveApi $driveApi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\DriveApi  $driveApi
     * @return \Illuminate\Http\Response
     */
    public function edit(DriveApi $driveApi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateDriveApiRequest  $request
     * @param  \App\Models\DriveApi  $driveApi
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateDriveApiRequest $request, DriveApi $driveApi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\DriveApi  $driveApi
     * @return \Illuminate\Http\Response
     */
    public function destroy(DriveApi $driveApi)
    {
        //
    }
}
