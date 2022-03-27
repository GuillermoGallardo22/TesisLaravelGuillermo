<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConsejosMiembrosRequest;
use App\Http\Requests\UpdateConsejosMiembrosRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\ConsejosMiembros;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ConsejosMiembrosController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(ConsejosMiembros::class);
    }

    public function index(Request $request)
    {
        $query = ConsejosMiembros::query();

        $query->orderBy('responsable', 'DESC');

        $query->applyFilters($request->all());

        return ResourceCollection::make($query->get());
    }

    public function store(StoreConsejosMiembrosRequest $request)
    {
        $validated = $request->validated();

        // return response()->json($validated);

        $consejosMiembros = ConsejosMiembros::create([
            'consejo_id' => $validated['consejo_id'],
            'miembro_id' => $validated['miembro_id'],
            'responsable' => $validated['responsable'],
        ]);

        // TODO: NOTIFICAR POR CORREO

        return ResourceObject::make($consejosMiembros);
    }

    public function show(ConsejosMiembros $consejosMiembros)
    {
        //
    }

    public function update(UpdateConsejosMiembrosRequest $request, ConsejosMiembros $consejosMiembros)
    {
        //
    }

    public function destroy(ConsejosMiembros $consejosMiembros)
    {
        $wasDeleted = $consejosMiembros->delete();

        if ($wasDeleted) {
            return response()->noContent(ResponseAlias::HTTP_OK);
        }

        return response()->noContent(ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
    }
}
