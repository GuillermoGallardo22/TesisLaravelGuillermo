<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Pageable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consejo extends Model
{
    use HasFactory, Filterable, Pageable;

    protected $fillable = [
        'nombre',
        'fecha',
        'tipo_consejo_id'
    ];

    public const FILTERS = ['search', 'estado'];

    protected $casts = [
        'estado' => 'boolean',
        'fecha' => 'datetime'
    ];

    public function fields()
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'fecha' => $this->fecha,
            'tipo_consejo' => $this->tipoConsejo,
            'estado' => $this->estado,
        ];
    }

    public function tipoConsejo()
    {
        return $this->belongsTo(TipoConsejo::class, 'tipo_consejo_id', 'id');
    }

    public function scopeSearch($query, $target)
    {
        return $query->where('nombre', 'like', "%$target%");
    }

    public function scopeEstado($query, $target)
    {
        return $query->where('estado', '=', $target);
    }
}
