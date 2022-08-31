<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModalidadActaGrado extends Model
{
    use HasFactory;

    protected $fillable = [
        'codigo',
        'nombre',
    ];

    public function fields()
    {
        return [
            'codigo' => $this->codigo,
            'nombre' => $this->nombre,
        ];
    }
}
