<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProcesoRequest;
use App\Http\Requests\UpdateProcesoRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Directorio;
use App\Models\Proceso;

class ProcesoController extends Controller
{

    public function index()
    {
        $filter = \request()->query('search');

        $procesos = Proceso::query();

        if ($filter) {
            $procesos = $procesos->filter($filter);
        }

        return ResourceCollection::make(
            $procesos
                ->fromActiveDirectory()
                ->paginate(100)
        );
    }

    public function store(StoreProcesoRequest $request)
    {
        $proceso = new Proceso($request->validated());
        $proceso->directorio_id = Directorio::query()->activeDirectory()->id;

        $proceso->save();

        return ResourceObject::make($proceso);
    }

    public function show(Proceso $proceso)
    {
        return ResourceObject::make($proceso);
    }

    public function update(UpdateProcesoRequest $request, Proceso $proceso)
    {
        $proceso->fill($request->validated())->save();
        return ResourceObject::make($proceso);
    }

    public function destroy(Proceso $proceso)
    {
        //
    }
}
