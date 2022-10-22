<?php

namespace App\Rules;

use App\Models\ActaGrado;
use App\Traits\DisponibilidadActa;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Log;

class DisponibilidadDocente implements Rule
{
    use DisponibilidadActa;

    private $actaGrado;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($actaGrado)
    {
        $this->actaGrado = $actaGrado;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $actaGrado = ActaGrado::find($this->actaGrado);

        $fecha_presentacion = Carbon::parse($actaGrado->fecha_presentacion);

        $actas = ActaGrado::query()
            ->with(['miembros'])
            ->whereDate("fecha_presentacion", $fecha_presentacion->toDateString())
            ->orderBy("fecha_presentacion")
            ->get()
            ->filter(function ($item) use ($value) {
                return $item->miembros->contains('docente_id', $value);
            });

        return $this->check($actas, $fecha_presentacion, $actaGrado->duracion);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans("validation.custom.acta_grado.create.validation.disponibilidad_docente");
    }
}
