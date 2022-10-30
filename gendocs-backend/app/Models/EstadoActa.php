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

    protected $hidden = [
        "created_at",
        "updated_at",
        "deleted_at",
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
