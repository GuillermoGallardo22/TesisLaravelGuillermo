<?php

namespace App\Rules;

use App\Models\Consejo;
use Illuminate\Contracts\Validation\Rule;

class DocumentosGenerador implements Rule
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
        return Consejo::find($value)->documentos()->exists();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.custom.acta.create.consejo.documentos');
    }
}
