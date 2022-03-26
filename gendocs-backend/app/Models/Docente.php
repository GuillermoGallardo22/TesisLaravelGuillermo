<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    use HasFactory;

    protected $fillable = [
        'cedula',
        'nombres',
        'correo',
        'correo_uta',
        'celular',
        'telefono',
    ];

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
}
