<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Numeracion extends Model
{
    use HasFactory;

    protected $table = 'numeraciones';

    protected $fillable = [
        'numero',
        'usado',
        'reservado',
        'encolado',
        'consejo_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
        'usado',
        'reservado',
        'encolado',
        'consejo_id',
    ];

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
            ->with('consejo')
            ->get();
    }

    public function scopeEncolados($query)
    {
        return $query->where('encolado', 1)
            ->where('usado', 0)
            ->orderBy('numero', 'DESC')
            ->get();
    }

    public function consejo()
    {
        return $this->belongsTo(Consejo::class, 'consejo_id');
    }
}
