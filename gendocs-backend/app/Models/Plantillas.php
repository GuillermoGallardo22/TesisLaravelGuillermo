<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plantillas extends Model
{
    use HasFactory;

    public const FILTERS = ["proceso", "search"];

    protected $fillable = [
        'nombre',
        'estado',
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
}
