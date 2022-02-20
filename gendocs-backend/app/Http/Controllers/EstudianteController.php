<?php

namespace App\Http\Controllers;

use App\Constants\Pagination;
use App\Constants\StoreTipoEstudiante;
use App\Http\Requests\StoreEstudianteRequest;
use App\Http\Requests\UpdateEstudianteRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Estudiante;
use Illuminate\Support\Arr;
use App\Constants\Query;

class EstudianteController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Estudiante::class);
    }

    public function index()
    {
        $query = Estudiante::query();

        // FILTERS
        $filters = \request()->query(Query::FILTER);


        if ($filters) {
            foreach ($filters as $filter => $value) {
                if (collect(Estudiante::FILTERS)->contains($filter)) {
                    $query->$filter($value);
                }
            }
        }

        // PAGINATION
        $pagination = \request()->query(Query::PAGE);

        $size = Pagination::SIZE;
        $number = Pagination::NUMBER;

        if ($pagination) {
            $size = Arr::get($pagination, Pagination::SIZE_TEXT, Pagination::SIZE);
            $size = $size > Pagination::SIZE ? Pagination::SIZE : (int)$size;
            //
            $number = (int)Arr::get($pagination, Pagination::NUMBER_TEXT, Pagination::NUMBER);
        }

        return ResourceCollection::make(
            $query
                ->orderBy('apellidos')
                ->paginate($size, '*', Pagination::NUMBER_PARAM, $number)
        );
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
