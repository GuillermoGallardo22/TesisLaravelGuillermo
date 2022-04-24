<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PlantillasGlobales extends Model
{
    use HasFactory, SoftDeletes, Filterable;

    protected $fillable = [
        'codigo',
        'nombre',
    ];

    public const FILTERS = ["codigo"];

    public function fields()
    {
        return [
            'id' => $this->id,
            'codigo' => $this->codigo,
            'nombre' => $this->nombre,
            'drive' => $this->archivo->google_drive_id,
        ];
    }

    public function archivo()
    {
        return $this->morphOne(DriveApi::class, 'model');
    }

    public function scopeCodigo(Builder $query, $value)
    {
        return $query->where('codigo', $value);
    }

    public function scopePlaAct(Builder $query): Model
    {
        return $query->where('codigo', \App\Constants\PlantillasGlobales::PLANTILLA_ACTA)->first();
    }

    public function scopePlaActSep(Builder $query): Model
    {
        return $query->where('codigo', \App\Constants\PlantillasGlobales::PLANTILLA_ACTA_SEPARADOR)->first();
    }
}
