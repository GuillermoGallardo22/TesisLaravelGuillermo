<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Carrera extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        "nombre",
        "estado"
    ];

    protected $casts = [
        'estado' => 'boolean',
    ];

    public const FILTERS = ['estado'];

    public function fields()
    {
        return [
            'id' => $this->id,
            "estado" => $this->estado,
            "nombre" => $this->nombre,
        ];
    }

    public function scopeEstado(Builder $query, $value)
    {
        return $query->where('estado', $value);
    }
}
