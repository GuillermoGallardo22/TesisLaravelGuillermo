<?php

namespace App\Rules;

use App\Models\ActaGrado;
use App\Traits\DisponibilidadActa;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Rule;

class DisponibilidadAula implements Rule
{
    use DisponibilidadActa;

    private $duracion;
    private $fecha_presentacion;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($fecha_presentacion, $duracion)
    {
        $this->fecha_presentacion = $fecha_presentacion;
        $this->duracion = $duracion;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $fecha_presentacion = Carbon::parse($this->fecha_presentacion);

        // $rangoI = (clone $fecha_presentacion);
        // $rangoF = (clone $fecha_presentacion)->addMinutes($this->duracion);

        $actas = ActaGrado::query()
            ->where("aula_id", $value)
            ->whereDate("fecha_presentacion", $fecha_presentacion->toDateString())
            ->orderBy("fecha_presentacion")
            ->get();

        return $this->check($actas, $fecha_presentacion, $this->duracion);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans("validation.custom.acta_grado.create.validation.disponibilidad_aula");
    }
}
