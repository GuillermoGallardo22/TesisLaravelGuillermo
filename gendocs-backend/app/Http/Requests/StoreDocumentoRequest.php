<?php

namespace App\Http\Requests;

use App\Rules\DocumentoModulo;
use App\Rules\NumeroAsignado;
use App\Rules\NumeroConsejo;
use App\Rules\Responsable;
use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentoRequest extends FormRequest
{
    protected $stopOnFirtsFailure = true;

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
            'plantilla' => [
                'bail',
                'required',
                'exists:\App\Models\Plantillas,id'
            ],
            'module' => [
                'bail',
                'required',
                'string',
                'exists:\App\Models\Module,code',
                new DocumentoModulo(
                    $this->consejo,
                    $this->plantilla,
                )
            ],
            'numero' => [
                'bail',
                'required',
                'numeric',
                new NumeroAsignado($this->module),
                new NumeroConsejo($this->consejo, $this->module)
            ],
            'estudiante' => ['nullable', 'exists:\App\Models\Estudiante,id'],
            'descripcion' => ['string', 'nullable', 'max:512'],
            'docentes' => ['present', 'array', 'exists:\App\Models\Docente,id']
        ];
    }
}
