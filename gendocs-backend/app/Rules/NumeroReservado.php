<?php

namespace App\Rules;

use App\Models\Numeracion;
use Illuminate\Contracts\Validation\Rule;

class NumeroReservado implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
        return !Numeracion::query()
            ->where('numero', $value)
            ->where('reservado', 1)
            ->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.custom.numeracion.create.numeroReservado');
    }
}
