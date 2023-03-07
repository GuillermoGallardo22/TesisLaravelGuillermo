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
            "fecha_inicio_estudios" => ["sometimes", "nullable", "date"],
            "fecha_fin_estudios" => ["sometimes", "nullable", "date"],
            "creditos_aprobados" => ["required", "integer", "min:1"],
            "horas_practicas" => ["present", "integer"],
            "numero_aux" => ["present", "integer"],
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
            "titulo_bachiller" => ["required", "string", "max:255"],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            "fecha_inicio_estudios" => $this->fecha_inicio_estudios ? Carbon::parse($this->fecha_inicio_estudios)->setSecond(0)->setMilli(0)->toDateString() : null,
            "fecha_fin_estudios" => $this->fecha_fin_estudios ? Carbon::parse($this->fecha_fin_estudios)->setSecond(0)->setMilli(0)->toDateString() : null,
            "fecha_presentacion" => $this->fecha_presentacion ? Carbon::parse($this->fecha_presentacion)->setSecond(0)->setMilli(0) : null,
            //
            "creditos_aprobados" => isset($this->creditos_aprobados) ? (int)$this->creditos_aprobados : null,
            "estado_acta" => $this->estado_acta ? $this->estado_acta : null,
            "horas_practicas" => isset($this->horas_practicas) ? (int)$this->horas_practicas : null,
            "numero_aux" => isset($this->numero_aux) ? (int)$this->numero_aux : null,
            "aula" => $this->aula ? $this->aula : null,
            "link" => $this->link ? $this->link : null,
            "tema" => isset($this->tema) ? $this->tema : "",
        ]);
    }
}
