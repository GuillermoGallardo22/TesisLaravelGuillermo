<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Carrera extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        "nombre",
        "estado",
        'titulo_mas',
        'titulo_fem',
        'creditos',
        'coordinador',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'estado' => 'boolean',
        'desaparecera' => 'boolean',
    ];

    public const FILTERS = ['estado', 'antigua'];

    public function fields()
    {
        return [
            'id' => $this->id,
            "estado" => $this->estado,
            "nombre" => $this->nombre,
            "titulo_mas" => $this->titulo_mas,
            "titulo_fem" => $this->titulo_fem,
            "creditos" => $this->creditos,
            "coordinador" => $this->coordinador,
        ];
    }

    public function scopeAntigua(Builder $query, $value)
    {
        return $query->where('desaparecera', $value);
    }

    public function scopeEstado(Builder $query, $value)
    {
        return $query->where('estado', $value);
    }
}
