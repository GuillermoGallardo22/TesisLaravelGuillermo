<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Pageable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proceso extends Model
{
    use HasFactory, Pageable, Filterable;

    protected $fillable = [
        'nombre',
        'estado',
    ];

    protected $casts = [
        'estado' => 'boolean',
    ];

    public const FILTERS = ['search', 'estado'];

    public function fields()
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'estado' => $this->estado,
        ];
    }

    public function directorio()
    {
        return $this->morphOne(DriveApi::class, 'model');
    }

    public function scopeFromActiveDirectory($query)
    {
        return $query->where('directorio_id', Directorio::query()->activeDirectory()->id);
    }

    public function scopeSearch($query, $filter)
    {
        return $query->where('nombre', 'like', "%$filter%");
    }

    public function scopeEstado($query, $filter)
    {
        return $query->where('estado', '=', $filter);
    }
}
