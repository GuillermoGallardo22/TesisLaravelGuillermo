<?php

namespace App\Observers;

use App\Models\ConsejosMiembros;

class ConsejosMiembrosObserver
{
    /**
     * Handle the ConsejosMiembros "created" event.
     *
     * @param  \App\Models\ConsejosMiembros  $consejosMiembros
     * @return void
     */
    public function created(ConsejosMiembros $consejosMiembros)
    {
        //
    }

    /**
     * Handle the ConsejosMiembros "updated" event.
     *
     * @param  \App\Models\ConsejosMiembros  $consejosMiembros
     * @return void
     */
    public function updated(ConsejosMiembros $consejosMiembros)
    {
        //
    }

    /**
     * Handle the ConsejosMiembros "deleted" event.
     *
     * @param  \App\Models\ConsejosMiembros  $consejosMiembros
     * @return void
     */
    public function deleted(ConsejosMiembros $consejosMiembros)
    {
        $consejosMiembros->update([
            'asistira' => false,
            'notificado' => false,
            'responsable' => false,
        ]);
    }

    /**
     * Handle the ConsejosMiembros "restored" event.
     *
     * @param  \App\Models\ConsejosMiembros  $consejosMiembros
     * @return void
     */
    public function restored(ConsejosMiembros $consejosMiembros)
    {
        //
    }

    /**
     * Handle the ConsejosMiembros "force deleted" event.
     *
     * @param  \App\Models\ConsejosMiembros  $consejosMiembros
     * @return void
     */
    public function forceDeleted(ConsejosMiembros $consejosMiembros)
    {
        //
    }
}
