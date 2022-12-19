<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CeldasNotasTipoActaGrado extends Model
{
    use HasFactory, Filterable;

    public const FILTERS = ['tipoActa'];

    protected $fillable = [
        'tipo_acta_grado_id',
        'celda',
        'variable_nota',
        'variable_nota_texto',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function scopeTipoActa($query, $value)
    {
        return $query->where("tipo_acta_grado_id", $value);
    }
}
