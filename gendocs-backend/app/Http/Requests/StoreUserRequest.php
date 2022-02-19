<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'correo_principal' => ['required', 'string', 'unique:\App\Models\User,email', 'max:255'],
            'correo_secundario' => ['required', 'string', 'email', 'unique:\App\Models\User,email_gmail', 'max:255'],
            'rol' => ['required', 'exists:\Spatie\Permission\Models\Role,id'],
        ];
    }
}
