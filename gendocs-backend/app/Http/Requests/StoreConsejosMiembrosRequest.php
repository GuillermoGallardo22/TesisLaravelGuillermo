<?php

namespace App\Http\Requests;

use App\Models\ConsejosMiembros;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreConsejosMiembrosRequest extends FormRequest
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
            'consejo_id' => ['required', 'exists:\App\Models\Consejo,id'],
            'miembro_id' => [
                'required',
                'exists:\App\Models\Docente,id',
                Rule::unique(ConsejosMiembros::class)
                    ->where('consejo_id', $this->consejo_id)
                    ->where('miembro_id', $this->miembro_id)
            ],
            'responsable' => [
                'nullable',
                'boolean',
                Rule::unique(ConsejosMiembros::class)
                    ->where('responsable', $this->responsable)
                    ->where('responsable', true)
                    ->where('consejo_id', $this->consejo_id)
            ]
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'consejo_id' => $this->consejo,
            'miembro_id' => $this->miembro,
        ]);
    }

    public function attributes()
    {
        return [
            'consejo_id' => 'consejo',
            'miembro_id' => 'miembro',
        ];
    }


}
