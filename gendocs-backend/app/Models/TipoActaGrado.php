<?php

namespace App\Models;

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
            // 'carreras' => $this->carreras,
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
}
