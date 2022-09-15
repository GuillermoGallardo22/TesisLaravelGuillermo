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

    public const FILTERS = ['carrera'];

    public function fields()
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'codigo' => $this->codigo,
            'carreras' => ResourceCollection::make($this->carreras),
            'drive' => $this->archivo->google_drive_id,
        ];
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
}
