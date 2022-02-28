<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proceso extends Model
{
    use HasFactory;

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
        return $this->belongsTo(Directorio::class, 'directorio_id');
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
