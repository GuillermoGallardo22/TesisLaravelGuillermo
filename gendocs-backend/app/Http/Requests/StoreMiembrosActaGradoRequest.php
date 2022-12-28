<?php

namespace App\Http\Requests;

use App\Constants\TipoAsistenteActaGrado;
use App\Rules\DisponibilidadDocente;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMiembrosActaGradoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "docente" => ["required", "exists:\App\Models\Docente,id", new DisponibilidadDocente($this->actaGrado)],
            "actaGrado" => ["required", "exists:\App\Models\ActaGrado,id"],
            "tipo" => ["required", Rule::in([TipoAsistenteActaGrado::TUTOR, TipoAsistenteActaGrado::M_PRINCIPAL, TipoAsistenteActaGrado::M_SUPLENTE, TipoAsistenteActaGrado::PRESIDENTE])],
            "informacion_adicional" => ["nullable", "string", "max:100"],
            "fecha_asignacion" => ["nullable", "date"],
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            "informacion_adicional" => isset($this->informacion_adicional) ? $this->informacion_adicional : null,
        ]);
    }
}
