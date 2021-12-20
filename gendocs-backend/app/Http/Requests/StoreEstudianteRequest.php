<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEstudianteRequest extends FormRequest
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
            'cedula' => ['required', 'string', 'max:10', 'unique:\App\Models\Estudiante,cedula'],
            'nombres' => ['required', 'string', 'max:100'],
            'apellidos' => ['required', 'string', 'max:100'],
            'celular' => ['required', 'string', 'max:10'],
            'telefono' => ['present', 'string', 'nullable', 'max:10'],
            'correo' => ['present', 'string', 'nullable', 'max:100'],
            'correo_uta' => ['required', 'string', 'max:100'],
            'folio' => ['required', 'string', 'max:10'],
            'matricula' => ['required', 'string', 'max:10'],
            'carrera' => ['required', 'exists:\App\Models\Carrera,id']
        ];
    }
}
