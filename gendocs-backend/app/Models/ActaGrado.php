<?php

namespace App\Models;

use App\Http\Resources\ResourceObject;
use App\Traits\Filterable;
use Google\Service\Resource;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ActaGrado extends Model
{
    use HasFactory, Filterable, SoftDeletes;

    protected $fillable = [
        "numero",
        "titulo_bachiller",
        "fecha_inicio_estudios",
        "fecha_fin_estudios",
        "creditos_aprobados",
        "horas_practicas",
        "fecha_presentacion",
        "estudiante_id",
        "carrera_id",
        "canton_id",
        "tipo_acta_id",
        "estado_acta_id",
        "modalidad_acta_grado_id",
        "aula_id",
        "duracion",
        "link",
        "directorio_id",
        "solicitar_especie",
        "envio_financiero_especie",
        "created_user_id",
    ];

    protected const FILTERS = ["carrera"];

    protected $cast = [
        "solicitar_especie" => "boolean",
        "envio_financiero_especie" => "boolean",
        "fecha_inicio_estudios" => "date",
        "fecha_fin_estudios" => "date",
        "fecha_presentacion" => "dateTime"
    ];

    public function fields()
    {
        return [
            "id" => $this->id,
            "numero" => $this->numero,
            "titulo_bachiller" => $this->titulo_bachiller,
            "fecha_inicio_estudios" => $this->fecha_inicio_estudios,
            "fecha_fin_estudios" => $this->fecha_fin_estudios,
            "creditos_aprobados" => $this->creditos_aprobados,
            "fecha_presentacion" => $this->fecha_presentacion,
            "horas_practicas" => $this->horas_practicas,
            "solicitar_especie" => $this->solicitar_especie,
            "envio_financiero_especie" => $this->envio_financiero_especie,
            "link" => $this->link,
            "duracion" => $this->duracion,
            "aula" => ResourceObject::make($this->aula),
            "modalidad_acta_grado" => ResourceObject::make($this->modalidad),
            "estudiante" => ResourceObject::make($this->estudiante),
            "canton" => ResourceObject::make($this->canton),
            "tipo_acta" => ResourceObject::make($this->tipoActa),
            "estado_acta" => ResourceObject::make($this->estadoActa),
        ];
    }

    public function scopeCarrera(Builder $query, $value)
    {
        return $query->where("carrera_id", $value);
    }

    public function aula()
    {
        return $this->belongsTo(Aula::class, "aula_id");
    }

    public function modalidad()
    {
        return $this->belongsTo(ModalidadActaGrado::class, "modalidad_acta_grado_id");
    }

    public function estadoActa()
    {
        return $this->belongsTo(EstadoActa::class, "estado_acta_id");
    }

    public function tipoActa()
    {
        return $this->belongsTo(TipoActaGrado::class, "tipo_acta_id");
    }

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, "estudiante_id");
    }

    public function canton()
    {
        return $this->belongsTo(Canton::class, "canton_id");
    }

    public function miembros()
    {
        return $this->hasMany(MiembrosActaGrado::class, "acta_grado_id");
    }
}
