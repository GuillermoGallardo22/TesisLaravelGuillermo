<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Directorio extends Model
{
    use HasFactory;

    public function scopeActiveDirectory($query)
    {
        return $query->where('estado', true)->first();
    }

    public function consejos(): HasMany
    {
        return $this->hasMany(Consejo::class, 'directorio_id');
    }
}
