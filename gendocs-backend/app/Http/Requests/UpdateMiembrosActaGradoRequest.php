<?php

namespace App\Http\Requests;

use App\Constants\TipoAsistenteActaGrado;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateMiembrosActaGradoRequest extends FormRequest
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
            "asistio" => ["boolean", "sometimes"],
            "tipo" => ["required", Rule::in([
                TipoAsistenteActaGrado::TUTOR,
                TipoAsistenteActaGrado::M_PRINCIPAL,
                TipoAsistenteActaGrado::M_SUPLENTE,
                TipoAsistenteActaGrado::PRESIDENTE,
            ]), "sometimes"],
            "informacion_adicional" => ["string", "sometimes"],
            "fecha_asignacion" => ["date", "sometimes"],
        ];
    }

    public function prepareForValidation()
    {
        $this->merge([
            "informacion_adicional" => isset($this->informacion_adicional) ? $this->informacion_adicional : null,
            "fecha_asignacion" => isset($this->fecha_asignacion) ? $this->fecha_asignacion : null,
        ]);
    }
}
