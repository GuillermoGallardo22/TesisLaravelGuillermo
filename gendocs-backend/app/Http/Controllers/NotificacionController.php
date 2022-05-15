<?php

namespace App\Http\Controllers;

use App\Http\Requests\NotificacionRequest;
use App\Models\Estudiante;
use App\Models\Miembro;
use App\Notifications\AsistenciaMiembroNotification;
use App\Notifications\DocumentNotification;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class NotificacionController extends Controller
{
    public function index()
    {
        //
    }

    public function store(NotificacionRequest $request)
    {
        $validated = $request->validated();

        $miembro = $validated['miembro'];

        if ($miembro) {
            $miembro = Miembro::find($miembro);

            $miembro->notify(new AsistenciaMiembroNotification($validated["mensaje"]));

            $miembro->update(['notificado' => true]);
        }
    }

    public function show($id)
    {
        //
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
