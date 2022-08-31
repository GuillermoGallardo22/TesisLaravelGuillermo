<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aula extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        'nombre',
    ];

    protected const FILTERS = ['search'];

    public function fields()
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
        ];
    }

    public function scopeSearch(Builder $query, $value)
    {
        return $query->where('nombre', 'like', "%$value%");
    }
}
