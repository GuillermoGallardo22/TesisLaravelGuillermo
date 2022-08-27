<?php

namespace App\Http\Requests;

use App\Constants\Genero;
use App\Constants\StoreTipoEstudiante;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
        $isAListOfStudents = $this->request->get('type') === StoreTipoEstudiante::List;

        return $isAListOfStudents ?
            [
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
                'estudiantes.*.genero' => ['present', Rule::in([Genero::FEMENINO, Genero::MASCULINO, ""])],
                'estudiantes.*.fecha_nacimiento' => ['present', "nullable", 'date'],
            ] :
            [
                'cedula' => ['required', 'string', 'max:10', 'unique:\App\Models\Estudiante,cedula'],
                'nombres' => ['required', 'string', 'max:100'],
                'apellidos' => ['required', 'string', 'max:100'],
                'celular' => ['required', 'string', 'max:10'],
                'telefono' => ['present', 'string', 'nullable', 'max:10'],
                'correo' => ['present', 'string', 'nullable', 'max:100'],
                'correo_uta' => ['required', 'string', 'max:100'],
                'folio' => ['nullable', 'string', 'max:10'],
                'matricula' => ['nullable', 'string', 'max:10'],
                'carrera' => ['required', 'exists:\App\Models\Carrera,id'],
                'genero' => ['present', Rule::in([Genero::FEMENINO, Genero::MASCULINO, ""])],
                'fecha_nacimiento' => ['present', "nullable", 'date'],
            ];
    }
}
