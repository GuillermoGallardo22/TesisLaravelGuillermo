<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCarreraRequest extends FormRequest
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
            'nombre' => ['required', 'string', 'max:512'],
            'estado' => ['nullable', 'boolean'],
            'titulo_mas' => ['required', 'string', 'max:512'],
            'titulo_fem' => ['required', 'string', 'max:512'],
            'creditos' => ['required', 'numeric', 'min:0']
            ];
    }
}
