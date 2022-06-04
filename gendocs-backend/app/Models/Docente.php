<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Pageable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    use HasFactory, Filterable, Pageable;

    protected $fillable = [
        'cedula',
        'nombres',
        'correo',
        'correo_uta',
        'celular',
        'telefono',
    ];

    public const FILTERS = ['search'];

    public function fields()
    {
        return [
            'id' => $this->id,
            "cedula" => $this->cedula,
            "nombres" => $this->nombres,
            "celular" => $this->celular,
            "telefono" => $this->telefono,
            "correo" => $this->correo,
            "correo_uta" => $this->correo_uta,
        ];
    }

    public function scopeSearch(Builder $query, $filter)
    {
        $filter = preg_replace('/\s+/', '%', $filter);

        return $query
            ->where('cedula', 'like', "%$filter%")
            ->orWhere("nombres", 'like', "%$filter%");
    }
}
