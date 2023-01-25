<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCargoRequest;
use App\Http\Requests\UpdateCargoRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Cargo;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class CargoController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Cargo::class);
    }

    public function index()
    {
        $query = Cargo::query();
        $query
        ->orderBy('nombre');
        return ResourceCollection::make($query->get());
    }

    public function store(StoreCargoRequest $request)
    {
        $validated = $request->validated();

        $cargo = Cargo::create([
            'nombre' => $validated['nombre'],
            'variable' => $validated['variable'],
            'docente_id' => $validated['docente'],
        ]);

        return ResourceObject::make($cargo);
    }

    public function show(Cargo $cargo)
    {
        return ResourceObject::make($cargo);
    }

    public function update(UpdateCargoRequest $request, Cargo $cargo)
    {
        $validated = $request->validated();

        $cargo
            ->fill([
                'nombre' => $validated['nombre'],
                'docente_id' => $validated['docente'],
            ])
            ->save();

        return ResourceObject::make($cargo);
    }

    public function destroy(Cargo $cargo)
    {
        $cargo->delete();

        return response()->noContent(ResponseAlias::HTTP_OK);
    }
}
