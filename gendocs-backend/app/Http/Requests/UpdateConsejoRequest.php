<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateConsejoRequest extends FormRequest
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
            'nombre' => ['string', 'required', 'max:255'],
            'fecha' => ['date', 'required'],
            'tipo_consejo' => ['required', 'exists:\App\Models\TipoConsejo,id'],
        ];
    }
}
