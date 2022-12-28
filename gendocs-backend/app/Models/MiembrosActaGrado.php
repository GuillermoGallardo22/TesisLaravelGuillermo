<?php

namespace App\Models;

use App\Http\Resources\ActaGradoResource;
use App\Http\Resources\ResourceObject;
use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MiembrosActaGrado extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        "acta_grado_id",
        "docente_id",
        "tipo",
        "informacion_adicional",
        "fecha_asignacion",
    ];

    protected const FILTERS = ["actaGrado"];

    protected $casts = [
        "notificado" => "boolean",
        "asistio" => "boolean",
        "fecha_asignacion" => "date",
    ];

    public function fields()
    {
        return [
            "id" => $this->id,
            "actaGrado" => ActaGradoResource::make($this->actaGrado),
            "docente" => ResourceObject::make($this->docente),
            "tipo" => $this->tipo,
            "informacion_adicional" => $this->informacion_adicional,
            "notificado" => $this->notificado,
            "asistio" => $this->asistio,
            "fecha_asignacion" => $this->fecha_asignacion,
        ];
    }

    public function scopeActaGrado(Builder $query, $value)
    {
        return $query->where("acta_grado_id", $value);
    }

    public function actaGrado()
    {
        return $this->belongsTo(ActaGrado::class, "acta_grado_id");
    }

    public function docente()
    {
        return $this->belongsTo(Docente::class, "docente_id");
    }
}
