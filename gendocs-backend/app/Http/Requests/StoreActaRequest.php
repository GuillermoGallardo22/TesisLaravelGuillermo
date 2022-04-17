<?php

namespace App\Http\Requests;

use App\Rules\DocumentosGenerador;
use Illuminate\Foundation\Http\FormRequest;

class StoreActaRequest extends FormRequest
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
            'consejo' => ['bail', 'exists:\App\Models\Consejo,id', new DocumentosGenerador()],
        ];
    }
}
