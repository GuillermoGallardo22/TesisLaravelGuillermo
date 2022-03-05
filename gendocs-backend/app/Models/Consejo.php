<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consejo extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'fecha',
        'tipo_consejo_id'
    ];

    public function fields()
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'fecha' => $this->fecha,
            'tipo_consejo' => $this->tipoConsejo(),
            'estado' => $this->estado,
        ];
    }

    public function tipoConsejo()
    {
        return $this->belongsTo(TipoConsejo::class, 'tipo_consejo_id');
    }
}
