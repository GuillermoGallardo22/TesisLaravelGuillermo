<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estudiante extends Model
{
    use HasFactory;

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

    public function carrera()
    {
        return $this->belongsTo(Carrera::class, "carrera_id");
    }
}
