<?php

namespace App\Rules;

use App\Models\Numeracion;
use Illuminate\Contracts\Validation\Rule;

class NumeroConsejo implements Rule
{
    private $consejo;
    private $moduleCode;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($consejo, $moduleCode)
    {
        $this->consejo = $consejo;
        $this->moduleCode = $moduleCode;
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
        $moduleCode = $this->moduleCode;

        $queryBase = Numeracion::query()->whereHas('module', function ($query) use ($moduleCode) {
            $query->where('code', $moduleCode);
        });

        if ((clone $queryBase)
            ->where('numero', $numero)
            ->where("reservado", true)
            ->where("consejo_id", "<>", $consejo)
            ->exists()
        ) {
            return false;
        }

        if (
            // SI EL CONSEJO TIENE NUMERACIONES RESERVADAS PARA EL MÓDULO
            (clone $queryBase)->where('consejo_id', $consejo)->exists()
            // ||
            // // SI EL NÚMERO EXISTE Y NO ESTA ENCOLADO PARA EL MÓDULO
            // (clone $queryBase)->where('numero', $numero)->where('encolado', false)->exists()
        ) {
            return (clone $queryBase)
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
