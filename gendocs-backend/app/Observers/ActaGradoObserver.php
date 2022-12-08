<?php

namespace App\Observers;

use App\Models\ActaGrado;
use App\Models\NumeracionActaGrado;
use Illuminate\Support\Facades\Log;

class ActaGradoObserver
{
    /**
     * Handle the ActaGrado "created" event.
     *
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return void
     */
    public function created(ActaGrado $actaGrado)
    {
        Log::info("En ActaGradoObserver");

        $tempNumeracion = new NumeracionActaGrado([
            'numero' => $actaGrado->numero,
            'usado' => 1,
            'carrera_id' => $actaGrado->estudiante->carrera->id,
        ]);

        Log::info("Antes de tempNumeracion->save()");
        $tempNumeracion->save();
        Log::info("Despues de tempNumeracion->save()");
    }

    /**
     * Handle the ActaGrado "updated" event.
     *
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return void
     */
    public function updated(ActaGrado $actaGrado)
    {
        //
    }

    /**
     * Handle the ActaGrado "deleted" event.
     *
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return void
     */
    public function deleted(ActaGrado $actaGrado)
    {
        //
    }

    /**
     * Handle the ActaGrado "restored" event.
     *
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return void
     */
    public function restored(ActaGrado $actaGrado)
    {
        //
    }

    /**
     * Handle the ActaGrado "force deleted" event.
     *
     * @param  \App\Models\ActaGrado  $actaGrado
     * @return void
     */
    public function forceDeleted(ActaGrado $actaGrado)
    {
        //
    }
}
