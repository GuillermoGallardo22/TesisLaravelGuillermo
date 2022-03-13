<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentoRequest extends FormRequest
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
            'consejo' => ['required', 'exists:\App\Models\Consejo,id'],
            'plantilla' => ['required', 'exists:\App\Models\Plantillas,id'],
            'estudiante' => ['nullable', 'exists:\App\Models\Estudiante,id'],
            'descripcion' => ['string', 'nullable', 'max:512']
        ];
    }
}
