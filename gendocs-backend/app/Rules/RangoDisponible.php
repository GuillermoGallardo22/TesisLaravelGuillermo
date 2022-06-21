<?php

namespace App\Rules;

use App\Models\Numeracion;
use Illuminate\Contracts\Validation\Rule;

class RangoDisponible implements Rule
{
    private $hasta;
    private $moduleCode;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($hasta, $moduleCode)
    {
        $this->hasta = $hasta;
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
        $desde = $value;
        $hasta = $this->hasta;

        $existsDesde = Numeracion::query()
            ->module($this->moduleCode)
            ->where('numero', $desde)
            ->exists();

        $existsHasta = Numeracion::query()
            ->module($this->moduleCode)
            ->where('numero', $hasta)
            ->exists();

        return !$existsDesde && !$existsHasta;
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
