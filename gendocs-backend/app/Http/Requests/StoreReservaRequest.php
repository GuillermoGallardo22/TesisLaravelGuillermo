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
            'hasta' => [
                'bail',
                'numeric',
                'required',
                'min:1',
                new NumeroAsignado(),
                new NumeroReservado()
            ],
            'desde' => [
                'bail',
                'numeric',
                'required',
                'min:1',
                new NumeroSiguiente(),
                new NumeroAsignado(),
                new NumeroReservado(),
                new RangoValido($this->hasta),
                new RangoDisponible($this->hasta)
            ],
            'consejo' => ['required', 'exists:\App\Models\Consejo,id'],
        ];
    }
}
