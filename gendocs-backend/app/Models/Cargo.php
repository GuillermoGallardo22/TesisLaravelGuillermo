<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cargo extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'docente_id',
        'variable',
        'nombre',
    ];

    public function fields()
    {
        return [
            'id' => $this->id,
            "docente" => $this->docente,
            "variable" => $this->variable,
            "nombre" => $this->nombre,
        ];
    }

    public function docente()
    {
        return $this->belongsTo(Docente::class, 'docente_id');
    }
}
