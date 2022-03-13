<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDocumentoRequest;
use App\Http\Requests\UpdateDocumentoRequest;
use App\Models\Documento;

class DocumentoController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Documento::class);
    }

    public function index()
    {
        //
    }

    public function store(StoreDocumentoRequest $request)
    {
        return response()->json($request->validated());
    }

    public function show(Documento $documento)
    {
        //
    }

    public function update(UpdateDocumentoRequest $request, Documento $documento)
    {
        //
    }

    public function destroy(Documento $documento)
    {
        //
    }
}
