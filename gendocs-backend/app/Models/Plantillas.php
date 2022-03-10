<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Pageable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plantillas extends Model
{
    use HasFactory, Pageable, Filterable;

    public const FILTERS = ["proceso", "search"];

    protected $fillable = [
        'nombre',
        'estado',
        'proceso_id',
    ];

    protected $casts = [
        'estado' => 'boolean',
    ];

    public function fields()
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'estado' => $this->estado,
            'proceso' => $this->proceso,
            'drive' => $this->drive_id,
            'autor' => $this->autor,
        ];
    }

    public function scopeProceso($query, $value)
    {
        return $query->where('proceso_id', $value);
    }

    public function scopeSearch($query, $value)
    {
        return $query->where('nombre', 'like', "%$value%");
    }

    public function proceso()
    {
        return $this->belongsTo(Proceso::class, 'proceso_id');
    }

    public function autor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
