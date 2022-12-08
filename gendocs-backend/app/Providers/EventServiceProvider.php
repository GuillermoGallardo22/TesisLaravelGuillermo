<?php

namespace App\Providers;

use App\Models\Acta;
use App\Models\ActaGrado;
use App\Models\Consejo;
use App\Models\Documento;
use App\Models\Miembro;
use App\Models\Plantillas;
use App\Models\PlantillasGlobales;
use App\Models\Proceso;
use App\Models\TipoActaGrado;
use App\Models\TipoEstadoActaGrado;
use App\Observers\ActaGradoObserver;
use App\Observers\ActaObserver;
use App\Observers\ConsejoObserver;
use App\Observers\DocumentoObserver;
use App\Observers\MiembroObserver;
use App\Observers\PlantillaObserver;
use App\Observers\PlantillasGlobalesObserver;
use App\Observers\ProcesoObserver;
use App\Observers\TipoActaGradoObserver;
use App\Observers\TipoEstadoActaGradoObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        Proceso::observe(ProcesoObserver::class);
        Plantillas::observe(PlantillaObserver::class);
        Consejo::observe(ConsejoObserver::class);
        Documento::observe(DocumentoObserver::class);
        Miembro::observe(MiembroObserver::class);
        PlantillasGlobales::observe(PlantillasGlobalesObserver::class);
        TipoActaGrado::observe(TipoActaGradoObserver::class);
        TipoEstadoActaGrado::observe(TipoEstadoActaGradoObserver::class);
        ActaGrado::observe(ActaGradoObserver::class);
    }
}
