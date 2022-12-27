<?php

namespace App\Http\Requests;

use App\Constants\ModalidadesActaGrado;
use App\Rules\DisponibilidadAula;
use App\Rules\DisponibilidadLink;
use App\Rules\ModalidadActa;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class UpdateActaGradoRequest extends FormRequest
{

    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            "estado_acta" => ["sometimes", "nullable", "exists:\App\Models\EstadoActa,id"],
            "fecha_fin_estudios" => ["sometimes", "nullable", "date"],
            "horas_practicas" => ["present", "integer"],
            "fecha_presentacion" => ["sometimes", "nullable", "date"],
            "solicitar_especie" => ["required", "boolean"],
            "envio_financiero_especie" => ["required", "boolean"],
            "tema" => ["sometimes", "nullable", "string"],
            "aula" => [
                "bail",
                "sometimes",
                "nullable",
                "bail",
                "exists:\App\Models\Aula,id",
                new ModalidadActa($this->modalidad_acta_grado, ModalidadesActaGrado::PRE),
                DisponibilidadAula::onUpdate($this->fecha_presentacion, $this->duracion, $this->id),
            ],
            "link" => [
                "bail",
                "sometimes",
                "nullable",
                "url",
                new ModalidadActa($this->modalidad_acta_grado, ModalidadesActaGrado::ONL),
                DisponibilidadLink::onUpdate($this->fecha_presentacion, $this->duracion, $this->id),
            ],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            "fecha_fin_estudios" => $this->fecha_fin_estudios ? Carbon::parse($this->fecha_fin_estudios)->setSecond(0)->setMilli(0)->toDateString() : null,
            "fecha_presentacion" => $this->fecha_presentacion ? Carbon::parse($this->fecha_presentacion)->setSecond(0)->setMilli(0) : null,
            //
            "estado_acta" => $this->estado_acta ? $this->estado_acta : null,
            "horas_practicas" => isset($this->horas_practicas) ? (int)$this->horas_practicas : null,
            "aula" => $this->aula ? $this->aula : null,
            "link" => $this->link ? $this->link : null,
            "tema" => isset($this->tema) ? $this->tema : "",
        ]);
    }
}
