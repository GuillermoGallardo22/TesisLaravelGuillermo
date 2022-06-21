<?php

namespace App\Rules;

use App\Models\Numeracion;
use Illuminate\Contracts\Validation\Rule;

class NumeroAsignado implements Rule
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
        $moduleCode = $this->moduleCode;
        return !Numeracion::query()
            ->where('numero', $value)
            ->where('usado', true)
            ->whereHas('module', function ($query) use ($moduleCode) {
                $query->where('code', $moduleCode);
            })
            ->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.custom.documento.create.numero.usado');
    }
}
