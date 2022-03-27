<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMiembroRequest;
use App\Http\Requests\UpdateMiembroRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Miembro;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class MiembroController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Miembro::class);
    }

    public function index(Request $request)
    {
        $query = Miembro::query();

        $query->orderBy('responsable', 'DESC');

        $query->applyFilters($request->all());

        return ResourceCollection::make($query->get());
    }

    public function store(StoreMiembroRequest $request)
    {
        $validated = $request->validated();

        $miembro = Miembro::create($validated);

        return ResourceObject::make($miembro);
    }

    public function show(Miembro $miembro)
    {
        //
    }

    public function update(UpdateMiembroRequest $request, Miembro $miembro)
    {
        //
    }

    public function destroy(Miembro $miembro)
    {

        if (!$miembro->consejo->estado) {
            return response()->json([
                'errors' => trans('validation.custom.miembro.delete.consejo.estado')
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }

        $wasDeleted = $miembro->delete();

        if ($wasDeleted) {
            return response()->noContent(ResponseAlias::HTTP_OK);
        }

        return response()->noContent(ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
    }
}
