<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEstudianteListRequest;
use App\Http\Requests\StoreEstudianteRequest;
use App\Http\Requests\UpdateEstudianteRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Estudiante;

class EstudianteController extends Controller
{
    public function index()
    {
        $filter = \request()->query('search');

        $estudiantes = Estudiante::query();

        if ($filter) {
            $estudiantes = $estudiantes->filter($filter);
        }

        return ResourceCollection::make(
            $estudiantes
                ->orderBy('apellidos', 'asc')
                ->paginate(100)
        );
    }

    public function store(StoreEstudianteRequest $request)
    {
        $validated = $request->validated();
        $estudiante = new Estudiante($validated);

        $estudiante->carrera_id = $validated['carrera'];

        return $estudiante->save();
    }

    public function storeList(StoreEstudianteListRequest $request)
    {
        return Estudiante::insert($request->validated()['estudiantes']);
    }

    public function show(Estudiante $estudiante)
    {
        return ResourceObject::make($estudiante);
    }

    public function update(UpdateEstudianteRequest $request, Estudiante $estudiante)
    {
        $estudiante->fill($request->validated())->save();
        return ResourceObject::make($estudiante);
    }

    public function destroy(Estudiante $estudiante)
    {
        //
    }
}
