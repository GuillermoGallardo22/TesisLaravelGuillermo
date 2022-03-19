<?php

namespace App\Rules;

use App\Models\Numeracion;
use Illuminate\Contracts\Validation\Rule;

class RangoValido implements Rule
{
    private $hasta;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($hasta)
    {
        $this->hasta = $hasta;
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
        $desde = $value;
        $hasta = $this->hasta;

        return $desde < $hasta;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.custom.numeracion.create.rangoValido');
    }
}
