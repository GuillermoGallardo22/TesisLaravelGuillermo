<?php

namespace App\Rules;

use App\Models\Numeracion;
use Illuminate\Contracts\Validation\Rule;

class NumeroConsejo implements Rule
{
    private $consejo;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($consejo)
    {
        $this->consejo = $consejo;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param string $attribute
     * @param mixed $value
     * @return bool true = ok, false = bad
     */
    public function passes($attribute, $value)
    {
        $numero = $value;
        $consejo = $this->consejo;

        if (
            Numeracion::where('consejo_id', $consejo)->exists() ||
            Numeracion::where('numero', $numero)->exists()
        ) {
            return Numeracion::query()
                ->where('numero', $numero)
                ->where('consejo_id', $consejo)
                ->exists();
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.custom.documento.create.numero.numeroConsejoInconsistente');
    }
}
