<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocenteRequest extends FormRequest
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
            'cedula' => ['required', 'string', 'max:15', 'unique:\App\Models\Docente,cedula'],
            'nombres' => ['required', 'string', 'max:500'],
            'celular' => ['required', 'string', 'max:25'],
            'telefono' => ['present', 'string', 'nullable', 'max:25'],
            'correo' => ['present', 'string', 'nullable', 'max:150'],
            'correo_uta' => ['required', 'string', 'max:150'],
        ];
    }
}
