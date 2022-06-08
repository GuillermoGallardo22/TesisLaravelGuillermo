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
        'module_id',
        'directorio_id'
    ];

    protected $casts = [
        'estado' => 'boolean',
    ];

    public const FILTERS = ['search', 'estado', 'module'];

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

    public function scopeModule($query, $filter)
    {
        return $query->join('modules', 'procesos.module_id', 'modules.id')
            ->where('modules.code', $filter);
    }

    public function scopeEstado($query, $filter)
    {
        return $query->where('estado', '=', $filter);
    }

    public function plantillas()
    {
        return $this->hasMany(Plantillas::class, 'proceso_id');
    }
}
