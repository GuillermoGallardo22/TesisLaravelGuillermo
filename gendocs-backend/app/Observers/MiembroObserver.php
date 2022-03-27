<?php

namespace App\Observers;

use App\Models\Miembro;

class MiembroObserver
{
    /**
     * Handle the Miembro "created" event.
     *
     * @param  \App\Models\Miembro  $miembro
     * @return void
     */
    public function created(Miembro $miembro)
    {
        //
    }

    /**
     * Handle the Miembro "updated" event.
     *
     * @param  \App\Models\Miembro  $miembro
     * @return void
     */
    public function updated(Miembro $miembro)
    {
        //
    }

    /**
     * Handle the Miembro "deleted" event.
     *
     * @param  \App\Models\Miembro  $miembro
     * @return void
     */
    public function deleted(Miembro $miembro)
    {
        $miembro->update([
            'asistira' => false,
            'notificado' => false,
            'responsable' => false,
        ]);
    }

    /**
     * Handle the Miembro "restored" event.
     *
     * @param  \App\Models\Miembro  $miembro
     * @return void
     */
    public function restored(Miembro $miembro)
    {
        //
    }

    /**
     * Handle the Miembro "force deleted" event.
     *
     * @param  \App\Models\Miembro  $miembro
     * @return void
     */
    public function forceDeleted(Miembro $miembro)
    {
        //
    }
}
