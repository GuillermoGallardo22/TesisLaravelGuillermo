<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConsejoRequest;
use App\Http\Requests\UpdateConsejoRequest;
use App\Http\Resources\ResourceObject;
use App\Models\Consejo;
use App\Models\Directorio;
use Carbon\Carbon;

class ConsejoController extends Controller
{
    public function index()
    {
        //
    }

    public function store(StoreConsejoRequest $request)
    {
        $validated = $request->validated();

        $consejo = new Consejo([
            'nombre' => $validated['nombre'],
            'fecha' => new Carbon($validated['fecha']),
            'tipo_consejo_id' => $validated['tipo_consejo'],
        ]);

        $consejo->directorio_id = Directorio::activeDirectory()->id;

        $consejo->save();

        return ResourceObject::make($consejo);
    }

    public function show(Consejo $consejo)
    {
        //
    }

    public function update(UpdateConsejoRequest $request, Consejo $consejo)
    {
        //
    }

    public function destroy(Consejo $consejo)
    {
        //
    }
}
