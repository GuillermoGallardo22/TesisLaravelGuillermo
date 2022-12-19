<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCeldasNotasTipoActaGradoRequest extends FormRequest
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
            "tipo_acta_grado" => ["exists:\App\Models\TipoActaGrado,id"],
            "celda" => ["required", "string"],
            "variable_nota" => ["required", "string"],
        ];
    }
}
