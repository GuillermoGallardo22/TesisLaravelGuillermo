<?php

namespace App\Http\Requests;

use App\Constants\Genero;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateEstudianteRequest extends FormRequest
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
            'cedula' => ['required', 'string', 'max:10'],
            'nombres' => ['required', 'string', 'max:100'],
            'apellidos' => ['required', 'string', 'max:100'],
            'celular' => ['required', 'string', 'max:10'],
            'telefono' => ['present', 'string', 'nullable', 'max:10'],
            'correo' => ['present', 'string', 'nullable', 'max:100'],
            'correo_uta' => ['required', 'string', 'max:100'],
            'folio' => ['nullable', 'string', 'max:10'],
            'matricula' => ['nullable', 'string', 'max:10'],
            'carrera_id' => ['required', 'exists:\App\Models\Carrera,id'],
            'genero' => ['present', Rule::in([Genero::FEMENINO, Genero::MASCULINO, ""])],
            'fecha_nacimiento' => ['present', "nullable", 'date'],
        ];
    }
}
