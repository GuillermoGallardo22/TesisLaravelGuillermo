<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDocenteRequest;
use App\Http\Requests\UpdateDocenteRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Docente;
use Illuminate\Http\Request;

class DocenteController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Docente::class);
    }

    public function index(Request $request)
    {
        $query = Docente::query();
        $query->orderBy('nombres');

        $query->applyFilters($request->all());

        return ResourceCollection::make($query->get());
    }

    public function store(StoreDocenteRequest $request)
    {
        $docente = Docente::create($request->validated());

        return ResourceObject::make($docente);
    }

    public function show(Docente $docente)
    {
        return ResourceObject::make($docente);
    }

    public function update(UpdateDocenteRequest $request, Docente $docente)
    {
        $docente
            ->fill($request->validated())
            ->save();

        return ResourceObject::make($docente);
    }

    public function destroy(Docente $docente)
    {
        //
    }
}
