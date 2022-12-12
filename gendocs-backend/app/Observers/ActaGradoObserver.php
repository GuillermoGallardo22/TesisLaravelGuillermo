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
        $num = NumeracionActaGrado::query()->where([
            'numero' => $actaGrado->numero,
            'carrera_id' => $actaGrado->estudiante->carrera->id,
        ])->first();

        if (!$num) {

            $ultimoNum = NumeracionActaGrado::query()
                ->where('carrera_id', $actaGrado->estudiante->carrera->id)
                ->orderBy("numero", "DESC")
                ->first();

            $desde = $ultimoNum?->numero || 0;

            for ($i = $desde + 1; $i <= $actaGrado->numero; $i++) {

                NumeracionActaGrado::create([
                    'numero' => $i,
                    'usado' => $i == $actaGrado->numero,
                    'encolado' => ($i != $actaGrado->numero),
                    'carrera_id' => $actaGrado->estudiante->carrera->id,
                ]);
            }
        } else {
            $num->usado = true;
            $num->encolado = false;
            $num->save();
        }
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
        $num = NumeracionActaGrado::query()->where([
            'numero' => $actaGrado->numero,
            'carrera_id' => $actaGrado->estudiante->carrera->id,
        ])->first();

        $num->usado = false;
        $num->encolado = true;

        $num->save();
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
