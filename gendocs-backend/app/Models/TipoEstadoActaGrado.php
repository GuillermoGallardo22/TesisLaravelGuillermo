<?php

namespace App\Models;

use App\Http\Resources\ResourceObject;
use Illuminate\Database\Eloquent\Model;

class TipoEstadoActaGrado extends Model
{

    protected $table = 'tipo_estado_acta_grado';

    public function fields()
    {
        return [
            'id' => $this->id,
            "drive" => $this->archivo?->google_drive_id,
            'estado'=>ResourceObject::make($this->estadoActaGrado)
        ];
    }

    public function archivo()
    {
        return $this->morphOne(DriveApi::class, 'model');
    }

    public function tipoActaGrado()
    {
        return $this->belongsTo(
            TipoActaGrado::class,
            'tipo_acta_grado_id',
        );
    }

    public function estadoActaGrado()
    {
        return $this->belongsTo(
            EstadoActa::class,
            'estado_acta_grado_id',
        );
    }
}
