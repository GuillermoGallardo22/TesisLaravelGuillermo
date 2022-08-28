<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstadoActa extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre_mas',
        'nombre_fem',
    ];

    public function fields()
    {
        return [
            'id' => $this->id,
            'codigo' => $this->codigo,
            'nombre_mas' => $this->nombre_mas,
            'nombre_fem' => $this->nombre_fem,
        ];
    }
}
