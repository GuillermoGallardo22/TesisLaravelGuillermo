<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCargoRequest extends FormRequest
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
            'docente' => ['required', 'exists:\App\Models\Docente,id'],
            'variable' => ['required', 'unique:\App\Models\Cargo,variable,NULL,id,deleted_at,NULL'],
            'nombre' => ['required', 'string', 'max:255'],
        ];
    }
}
