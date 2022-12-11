<?php

namespace App\Http\Requests;

use App\Constants\ModalidadesActaGrado;
use App\Rules\DisponibilidadAula;
use App\Rules\DisponibilidadDocente;
use App\Rules\DisponibilidadLink;
use App\Rules\ModalidadActa;
use App\Rules\ValidarNumeroActa;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StoreActaGradoRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            "estudiante" => ["required", "exists:\App\Models\Estudiante,id"],
            "numeracion" => [
                "required",
                "numeric",
                new ValidarNumeroActa($this->estudiante)
            ],
            "canton" => ["required", "exists:\App\Models\Canton,id"],
            "titulo_bachiller" => ["required", "string", "max:255"],
            "fecha_inicio_estudios" => ["required", "date"],
            "creditos_aprobados" => ["required", "numeric", "min:1"],
            "tipo_acta" => ["required", "exists:\App\Models\TipoActaGrado,codigo"],
            "solicitar_especie" => ["required", "boolean"],
            "envio_financiero_especie" => ["required", "boolean"],
            "duracion" => ["required", "numeric", "min:1"],
            "modalidad_acta_grado" => ["required", "exists:\App\Models\ModalidadActaGrado,codigo"],
            //
            "estado_acta" => ["sometimes", "nullable", "exists:\App\Models\EstadoActa,id"],
            "fecha_fin_estudios" => ["sometimes", "nullable", "date"],
            //
            "horas_practicas" => ["present", "numeric"],
            "fecha_presentacion" => ["sometimes", "nullable", "date"],
            "aula" => [
                "bail",
                "sometimes",
                "nullable",
                "bail",
                "exists:\App\Models\Aula,id",
                new ModalidadActa($this->modalidad_acta_grado, ModalidadesActaGrado::PRE),
                DisponibilidadAula::onCreate($this->fecha_presentacion, $this->duracion),
            ],
            "link" => [
                "bail",
                "sometimes",
                "nullable",
                "url",
                new ModalidadActa($this->modalidad_acta_grado, ModalidadesActaGrado::ONL),
                DisponibilidadLink::onCreate($this->fecha_presentacion, $this->duracion),
            ],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            "fecha_inicio_estudios" => $this->fecha_inicio_estudios ? Carbon::parse($this->fecha_inicio_estudios)->setSecond(0)->setMilli(0)->toDateString() : null,
            "fecha_fin_estudios" => $this->fecha_fin_estudios ? Carbon::parse($this->fecha_fin_estudios)->setSecond(0)->setMilli(0)->toDateString() : null,
            "fecha_presentacion" => $this->fecha_presentacion ? Carbon::parse($this->fecha_presentacion)->setSecond(0)->setMilli(0) : null,
            "presidente" => (!boolval($this->presidente) || $this->presidente < 1) ? null : $this->presidente,
            //
            "estado_acta" => $this->estado_acta ? $this->estado_acta : null,
            "horas_practicas" => isset($this->horas_practicas) ? $this->horas_practicas : null,
            "aula" => $this->aula ? $this->aula : null,
            "link" => $this->link ? $this->link : null,
        ]);
    }
}
