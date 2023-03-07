<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'nombre' => ['required', 'string', 'max:255'],
            'correo_principal' => ['required', 'string', 'max:255', 'unique:\App\Models\User,email,' . $this->user->id],
            'correo_secundario' => ['required', 'string', 'email', 'max:255'],
            'rol' => ['required', 'numeric', 'exists:\Spatie\Permission\Models\Role,id'],
            'status' => ['required', 'boolean'],
            'modulos' => ['required', 'array', 'exists:\App\Models\Module,id']
        ];
    }
}
