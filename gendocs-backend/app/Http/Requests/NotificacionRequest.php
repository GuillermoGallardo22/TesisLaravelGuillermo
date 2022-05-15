<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NotificacionRequest extends FormRequest
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
            'estudiante' => ['nullable', 'exists:\App\Models\Estudiante,id'],
            'miembro' => ['nullable', 'exists:\App\Models\Miembro,id'],
            //
            'mensaje' => ['nullable', 'string'],
        ];
    }
}
