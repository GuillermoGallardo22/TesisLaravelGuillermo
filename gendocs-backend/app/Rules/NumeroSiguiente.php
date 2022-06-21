<?php

namespace App\Rules;

use App\Models\Numeracion;
use Illuminate\Contracts\Validation\Rule;

class NumeroSiguiente implements Rule
{
    private $moduleCode;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($moduleCode)
    {
        $this->moduleCode = $moduleCode;
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
        $ultimo = Numeracion::query()->module($this->moduleCode)->max('numero');

        return ($ultimo + 1) === $value;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.custom.numeracion.create.numeroInicio');
    }
}
