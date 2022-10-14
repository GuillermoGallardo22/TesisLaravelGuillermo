<?php

namespace App\Rules;

use App\Models\ActaGrado;
use App\Traits\DisponibilidadActa;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Rule;

class DisponibilidadLink implements Rule
{
    use DisponibilidadActa;

    protected $fecha_presentacion;
    protected $duracion;

    /**
     * Create a new rule instance.
     * @param $fecha_presentacion
     * @param $duracion
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

        $actas = ActaGrado::query()
            ->where("link", $value)
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
        return trans("validation.custom.acta_grado.create.validation.disponibilidad_link");
    }
}
