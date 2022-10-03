<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NumeracionActaGrado extends Model
{
    use HasFactory, Filterable;

    protected const FILTERS = ["carrera"];

    public function scopeCarrera(Builder $builder, $value)
    {
        return $builder->where("carrera_id", $value);
    }

    public function scopeSiguiente($query)
    {
        return $query
            ->max('numero') + 1;
    }

    public function scopeEncolados($query)
    {
        return $query->where('encolado', 1)
            ->where('usado', 0)
            ->orderBy('numero', 'DESC');
    }
}
