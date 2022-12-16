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
    protected $actaGradoId;

    public function __construct()
    {
    }

    public static function onCreate($fecha_presentacion, $duracion)
    {
        $instance = new self();
        $instance->fill([
            "fecha_presentacion" => $fecha_presentacion,
            "duracion" => $duracion
        ]);
        return $instance;
    }

    public static function onUpdate($fecha_presentacion, $duracion, $actaGradoId)
    {
        $instance = new self();
        $instance->fill([
            "fecha_presentacion" => $fecha_presentacion,
            "duracion" => $duracion,
            "actaGradoId" => $actaGradoId,
        ]);
        return $instance;
    }

    protected function fill($row)
    {
        $this->fecha_presentacion = isset($row['fecha_presentacion']) ? $row['fecha_presentacion'] : null;
        $this->duracion = isset($row['duracion']) ? $row['duracion'] : null;
        $this->actaGradoId = isset($row['actaGradoId']) ? $row['actaGradoId'] : null;
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

        if ($this->actaGradoId !== null) {
            $actaGrado = ActaGrado::find($this->actaGradoId);
            if ($actaGrado->link === $value) {
                return true;
            }
        }

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
