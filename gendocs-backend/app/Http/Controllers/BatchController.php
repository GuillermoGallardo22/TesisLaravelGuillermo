<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResourceObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Bus;
use Symfony\Component\HttpFoundation\Response;

class BatchController extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        $batch = Bus::findBatch($id);

        if (!$batch) return response()->noContent(Response::HTTP_NOT_FOUND);

        return $batch;
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
