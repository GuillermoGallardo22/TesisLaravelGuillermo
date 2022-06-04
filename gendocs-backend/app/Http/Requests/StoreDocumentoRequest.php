<?php

namespace App\Http\Requests;

use App\Rules\NumeroAsignado;
use App\Rules\NumeroConsejo;
use App\Rules\Responsable;
use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentoRequest extends FormRequest
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
            'consejo' => [
                'bail',
                'required',
                'exists:\App\Models\Consejo,id',
                new Responsable(),
            ],
            'numero' => [
                'bail',
                'required',
                'numeric',
                new NumeroAsignado(),
                new NumeroConsejo($this->consejo)
            ],
            'plantilla' => ['required', 'exists:\App\Models\Plantillas,id'],
            'estudiante' => ['nullable', 'exists:\App\Models\Estudiante,id'],
            'descripcion' => ['string', 'nullable', 'max:512'],
            'docentes' => ['array', 'exists:\App\Models\Docente,id']
        ];
    }
}
