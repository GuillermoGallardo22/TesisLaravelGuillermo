<?php

namespace App\Http\Controllers;

use App\Constants\Pagination;
use App\Constants\StoreTipoEstudiante;
use App\Http\Requests\StoreEstudianteRequest;
use App\Http\Requests\UpdateEstudianteRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Estudiante;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Constants\Query;

class EstudianteController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Estudiante::class);
    }

    public function index(Request $request)
    {
        $query = Estudiante::query();

        $query
            ->orderBy('apellidos');

        $query->applyFilters($request->all());

        $paginate = $query->applyPaginate($request->all());

        if ($paginate['isPageable']) {
            return ResourceCollection::make(
                $query->paginate($paginate['size'], '*', $paginate['param'], $paginate['number'])
            );
        }

        return ResourceCollection::make($query->get());
    }

    public function store(StoreEstudianteRequest $request)
    {
        $validated = $request->validated();

        if ($request->input('type') === StoreTipoEstudiante::List) {
            return Estudiante::insert($request->validated()['estudiantes']);
        } else {
            $estudiante = new Estudiante($validated);
            $estudiante->carrera_id = $validated['carrera'];
            return $estudiante->save();
        }
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
