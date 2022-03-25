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

        $query->orderBy('estado', 'DESC');
        $query->orderBy('nombre', 'asc');

        $query->applyFilters($request->all());

        return ResourceCollection::make($query->get());
    }

    public function store(StoreCarreraRequest $request)
    {
        $carrera = Carrera::create($request->validated());

        return ResourceObject::make($carrera);
    }

    public function show(Carrera $carrera)
    {
        return ResourceObject::make($carrera);
    }

    public function update(UpdateCarreraRequest $request, Carrera $carrera)
    {
        $carrera
            ->fill($request->validated())
            ->save();

        return ResourceObject::make($carrera);
    }

    public function destroy(Carrera $carrera)
    {
        //
    }
}
