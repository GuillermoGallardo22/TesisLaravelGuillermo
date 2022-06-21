<?php

namespace App\Http\Requests;

use App\Rules\NumeroAsignado;
use App\Rules\NumeroReservado;
use App\Rules\NumeroSiguiente;
use App\Rules\RangoDisponible;
use App\Rules\RangoValido;
use Illuminate\Foundation\Http\FormRequest;

class StoreReservaRequest extends FormRequest
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
            'module' => [
                'bail',
                'required',
                'string',
                'exists:\App\Models\Module,code'
            ],
            'hasta' => [
                'bail',
                'numeric',
                'required',
                'min:1',
                new NumeroAsignado($this->module),
                new NumeroReservado($this->module)
            ],
            'desde' => [
                'bail',
                'numeric',
                'required',
                'min:1',
                new NumeroSiguiente($this->module),
                new NumeroAsignado($this->module),
                new NumeroReservado($this->module),
                new RangoValido($this->hasta, $this->module),
                new RangoDisponible($this->hasta, $this->module)
            ],
            'consejo' => ['required', 'exists:\App\Models\Consejo,id'],
        ];
    }
}
