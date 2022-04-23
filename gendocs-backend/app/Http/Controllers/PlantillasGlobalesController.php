<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlantillasGlobalesRequest;
use App\Http\Requests\UpdatePlantillasGlobalesRequest;
use App\Http\Resources\ResourceCollection;
use App\Models\PlantillasGlobales;
use Illuminate\Http\Request;

class PlantillasGlobalesController extends Controller
{

    public function index(Request $request)
    {
        $query = PlantillasGlobales::query();

        $query->orderBy('nombre');

        $query->applyFilters($request->all());

        return ResourceCollection::make($query->get());
    }

    public function store(StorePlantillasGlobalesRequest $request)
    {
        //
    }

    public function show(PlantillasGlobales $plantillasGlobales)
    {
        //
    }

    public function update(UpdatePlantillasGlobalesRequest $request, PlantillasGlobales $plantillasGlobales)
    {
        //
    }

    public function destroy(PlantillasGlobales $plantillasGlobales)
    {
        //
    }
}
