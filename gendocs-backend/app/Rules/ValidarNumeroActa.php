<?php

namespace App\Rules;

use App\Models\ActaGrado;
use App\Models\Estudiante;
use App\Models\NumeracionActaGrado;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Log;

class ValidarNumeroActa implements Rule
{
    protected $estudiante;

    /**
     * Create a new rule instance.
     * @param $estudiante
     */
    public function __construct($estudiante)
    {
        $this->estudiante = $estudiante;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $numero
     * @return bool
     */
    public function passes($attribute, $numero)
    {
        $estudiante = Estudiante::find($this->estudiante);

        $num = NumeracionActaGrado::query()
            ->where("numero", $numero)
            ->where("carrera_id", $estudiante->carrera->id)
            ->first();

        return !$num || ($num->encolado && !$num->usado);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.custom.acta_grado.create.validation.numero_asignado');
    }
}
