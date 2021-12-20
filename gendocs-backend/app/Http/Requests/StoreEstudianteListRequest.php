<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEstudianteListRequest extends FormRequest
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
            'carrera_id' => ['required', 'exists:\App\Models\Carrera,id'],
            'estudiantes.*.carrera_id' => ['required'],
            'estudiantes.*.cedula' => ['required', 'string', 'max:10', 'unique:\App\Models\Estudiante,cedula'],
            'estudiantes.*.nombres' => ['required', 'string', 'max:100'],
            'estudiantes.*.apellidos' => ['required', 'string', 'max:100'],
            'estudiantes.*.celular' => ['present', 'string', 'nullable', 'max:10'],
            'estudiantes.*.telefono' => ['present', 'string', 'nullable', 'max:10'],
            'estudiantes.*.correo' => ['present', 'string', 'nullable', 'max:100'],
            'estudiantes.*.correo_uta' => ['present', 'string', 'nullable', 'max:100'],
            'estudiantes.*.folio' => ['present', 'string', 'nullable', 'max:10'],
            'estudiantes.*.matricula' => ['present', 'string', 'nullable', 'max:10'],
        ];
    }
}
