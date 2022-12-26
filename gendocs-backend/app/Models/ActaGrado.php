<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ActaGrado extends Model
{
    use HasFactory, Filterable;

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
        "tema",
    ];

    protected $hidden = [
        "created_at",
        "updated_at",
        "deleted_at",
    ];

    protected const FILTERS = ["carrera"];

    protected $dates = [
        // "fecha_inicio_estudios",
        // "fecha_fin_estudios",
        "fecha_presentacion",
    ];

    protected $cast = [
        "solicitar_especie" => "boolean",
        "envio_financiero_especie" => "boolean",
        "fecha_inicio_estudios" => "date",
        "fecha_fin_estudios" => "date",
        "horas_practicas" => "integer",
        "creditos_aprobados" => "integer",
        "duracion" => "integer",
    ];

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

    public function estado()
    {
        return $this->belongsTo(EstadoActa::class, "estado_acta_id");
    }

    public function tipo()
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
