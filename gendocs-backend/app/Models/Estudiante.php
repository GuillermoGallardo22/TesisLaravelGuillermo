<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Pageable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory, Pageable, Filterable;

    protected $fillable = [
        "cedula",
        "nombres",
        "apellidos",
        "celular",
        "telefono",
        "correo",
        "correo_uta",
        "matricula",
        "folio",
        "carrera_id"
    ];

    public const FILTERS = ['search'];

    public function fields()
    {
        return [
            'id' => $this->id,
            "cedula" => $this->cedula,
            "nombres" => $this->nombres,
            "apellidos" => $this->apellidos,
            "celular" => $this->celular,
            "telefono" => $this->telefono,
            "correo" => $this->correo,
            "correo_uta" => $this->correo_uta,
            "matricula" => $this->matricula,
            "folio" => $this->folio,
            "carrera" => $this->carrera_id,
        ];
    }

    public function carrera()
    {
        return $this->belongsTo(Carrera::class, "carrera_id");
    }

    public function scopeSearch($query, $filter)
    {
        return $query
            ->where('cedula', 'like', "%$filter%")
            ->orWhere('matricula', 'like', "%$filter%")
            ->orWhere('folio', 'like', "%$filter%")
            ->orWhere('nombres', 'like', "%$filter%")
            ->orWhere('apellidos', 'like', "%$filter%");
    }
}
