<?php

namespace App\Rules;

use App\Models\Consejo;
use App\Models\Module;
use App\Models\Plantillas;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Log;

class DocumentoModulo implements Rule
{
    private $consejoId;
    private $plantillaId;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($consejoId, $plantillaId)
    {
        $this->consejoId = $consejoId;
        $this->plantillaId = $plantillaId;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $moduloConsejo = Consejo::find($this->consejoId)->module->modulo->id;
        $moduloPlantilla = Plantillas::find($this->plantillaId)->proceso->module->modulo->id;
        $moduloForm = Module::query()->where('code', $value)->first()->id;

        return $moduloConsejo === $moduloPlantilla && $moduloPlantilla === $moduloForm;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans('validation.custom.documento.create.consejo_plantilla_modulo');
    }
}
