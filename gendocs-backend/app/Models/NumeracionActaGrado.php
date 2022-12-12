<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class NumeracionActaGrado extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        "numero",
        "usado",
        "encolado",
        "carrera_id",
    ];

    protected $cast = [
        "encolado" => "boolean",
        "usado" => "boolean",
    ];

    protected const FILTERS = ["carrera"];

    public function scopeCarrera(Builder $builder, $value)
    {
        return $builder->where("carrera_id", $value);
    }

    public function scopeSiguiente(Builder $query)
    {
        $row = $query->orderBy("numero", "DESC")->first();

        return $row->numero + 1;
    }

    public function scopeEncolados($query)
    {
        return $query->where('encolado', 1)
            ->where('usado', 0)
            ->orderBy('numero', 'DESC');
    }
}
