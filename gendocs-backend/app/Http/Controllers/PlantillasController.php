<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlantillasRequest;
use App\Http\Requests\UpdatePlantillasRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Plantillas;

class PlantillasController extends Controller
{
    public function index()
    {
        $filters = \request()->query('filter');

        $plantillas = Plantillas::query();

        if ($filters) {
            foreach ($filters as $filter => $value) {
                if (collect(Plantillas::FILTERS)->contains($filter)) {
                    $plantillas->$filter($value);
                }
            }
        }

        return ResourceCollection::make($plantillas->paginate(100));
    }

    public function store(StorePlantillasRequest $request)
    {
        $validated = $request->validated();

        $plantilla = new Plantillas($validated);
        $plantilla->proceso_id = $validated['proceso'];

        $plantilla->save();

        return ResourceObject::make($plantilla);
    }

    public function show(Plantillas $plantilla)
    {
        return ResourceObject::make($plantilla);
    }

    public function update(UpdatePlantillasRequest $request, Plantillas $plantilla)
    {
        $validated = $request->validated();

        $plantilla->fill($validated);
        $plantilla->proceso_id = $validated['proceso'];

        $plantilla->save();

        return ResourceObject::make($plantilla);
    }

    public function destroy(Plantillas $plantilla)
    {
        //
    }
}
