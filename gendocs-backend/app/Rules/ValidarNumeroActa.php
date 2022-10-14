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

        $query = NumeracionActaGrado::query()
            ->where("numero", $numero)
            ->where("usado", false)
            ->where("carrera_id", $estudiante->carrera->id);

        Log::info([
            "exists" => $query->exists(),
            "numero" => $numero,
            "estudiante" => $estudiante->id,
            "carrera" => $estudiante->carrera->id,
        ]);

        return !$query->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El número ya esta asignado, no sea gil';
    }
}
