<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ModalidadActa implements Rule
{

    protected $modalidadSeleccionada;
    protected $modalidadObjetivo;

    /**
     * Create a new rule instance.
     * @param $modalidadSeleccionada
     * @param $modalidadObjetivo
     */
    public function __construct($modalidadSeleccionada, $modalidadObjetivo)
    {
        $this->modalidadSeleccionada = $modalidadSeleccionada;
        $this->modalidadObjetivo = $modalidadObjetivo;
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
        return $this->modalidadObjetivo === $this->modalidadSeleccionada;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans("validation.custom.acta_grado.create.validation.modalidad_seleccionada_aula_link");
    }
}
