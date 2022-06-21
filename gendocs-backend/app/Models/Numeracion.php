<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Numeracion extends Model
{
    use HasFactory, Filterable;

    protected $table = 'numeraciones';

    public const FILTERS = ['module'];

    protected $fillable = [
        'numero',
        'usado',
        'reservado',
        'encolado',
        'consejo_id',
        'module_id',
        'directorio_id',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'usado',
        'reservado',
        'encolado',
        'consejo_id',
    ];

    public function scopeFromActiveDirectory($query)
    {
        return $query->where('directorio_id', Directorio::query()->activeDirectory()->id);
    }

    public function scopeModule($query, $filter)
    {
        return $query->whereHas('module', function ($query) use ($filter) {
            $query->where('module_id', Module::query()->where('code', $filter)->first()?->id);
        });
    }

    public function scopeSiguiente($query)
    {
        return $query
            ->max('numero') + 1;
    }

    public function scopeReservados($query)
    {
        return $query->where('reservado', 1)
            ->where('usado', 0)
            ->orderBy('numero', 'DESC')
            ->with('consejo');
    }

    public function scopeEncolados($query)
    {
        return $query->where('encolado', 1)
            ->where('usado', 0)
            ->orderBy('numero', 'DESC');
    }

    public function consejo()
    {
        return $this->belongsTo(Consejo::class, 'consejo_id');
    }

    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id');
    }
}
