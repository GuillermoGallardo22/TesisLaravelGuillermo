<?php

namespace App\Models;

use App\Http\Resources\ResourceCollection;
use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TipoActaGrado extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        'nombre',
        'codigo',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public const FILTERS = ['carrera', 'codigo'];

    public function fields()
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'codigo' => $this->codigo,
            'carreras' => ResourceCollection::make($this->carreras),
            'drive' => $this->archivo->google_drive_id,
            "estados" => ResourceCollection::make($this->estados),
        ];
    }

    public function scopeCodigo(Builder $query, $value)
    {
        return $query->where('codigo', $value);
    }

    public function scopeCarrera(Builder $query, $carreraId)
    {
        return $query->whereHas('carreras', function (Builder $q) use ($carreraId) {
            $q->where('carrera_id', $carreraId);
        });
    }

    public function carreras()
    {
        return $this->belongsToMany(
            Carrera::class,
            TipoActaGradoCarrera::class,
            'tipo_acta_grado_id',
            'carrera_id',
        );
    }

    public function archivo()
    {
        return $this->morphOne(DriveApi::class, 'model');
    }

    public function estados()
    {
        return $this->hasMany(TipoEstadoActaGrado::class, "tipo_acta_grado_id");
    }

    public function celdasNotas()
    {
        return $this->hasMany(CeldasNotasTipoActaGrado::class, "tipo_acta_grado_id");
    }
}
