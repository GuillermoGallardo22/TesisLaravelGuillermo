<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePlantillasRequest extends FormRequest
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
            'proceso' => ['required', 'exists:\App\Models\Proceso,id'],
            'nombre' => ['required', 'string', 'max:512'],
            'estado' => ['required', 'boolean']
        ];
    }
}
