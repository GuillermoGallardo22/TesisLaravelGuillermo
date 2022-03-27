<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Pageable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Consejo extends Model
{
    use HasFactory, Filterable, Pageable, SoftDeletes;

    protected $fillable = [
        'nombre',
        'fecha',
        'tipo_consejo_id',
        'directorio_id',
        'estado'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at'
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

    public function directorioLocal()
    {
        return $this->belongsTo(Directorio::class, 'directorio_id');
    }

    public function directorio()
    {
        return $this->morphOne(DriveApi::class, 'model');
    }

    public function documentos(): HasMany
    {
        return $this->hasMany(Documento::class, 'consejo_id');
    }

    public function numerosReservados(): HasMany
    {
        return $this->hasMany(Numeracion::class, 'consejo_id');
    }

    public function miembros()
    {
        return $this->hasMany(Miembro::class);
    }

    public function responsable()
    {
        return $this->hasOne(Miembro::class)->where('responsable', true);
    }
}
