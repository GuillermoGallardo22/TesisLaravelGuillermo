<?php

namespace App\Http\Requests;

use App\Models\Miembro;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMiembroRequest extends FormRequest
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
            'docente_id' => [
                'required',
                'exists:\App\Models\Docente,id',
                Rule::unique(Miembro::class)
                    ->where('consejo_id', $this->consejo_id)
                    ->where('docente_id', $this->docente_id)
                    ->whereNull('deleted_at')
            ],
            'responsable' => [
                'nullable',
                'boolean',
                Rule::unique(Miembro::class)
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
            'docente_id' => $this->docente,
        ]);
    }

    public function attributes()
    {
        return [
            'consejo_id' => 'consejo',
            'docente_id' => 'docente',
        ];
    }
}
