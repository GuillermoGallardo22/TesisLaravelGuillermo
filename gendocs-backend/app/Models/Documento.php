<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Pageable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    use HasFactory, Pageable, Filterable;

    public const FILTERS = ["consejo", "search"];

    protected $fillable = [
        'consejo_id',
        'estudiante_id',
        'numero',
        'plantilla_id',
        'autor_id',
        'descripcion',
    ];

    public function fields()
    {
        return [
            'id' => $this->id,
            'numero' => $this->numero,
            'descripcion' => $this->descripcion,
            'consejo' => $this->consejo,
            'estudiante' => $this->estudiante,
            'plantilla' => $this->plantilla,
            'autor' => $this->autor,
            'drive' => $this->archivo->google_drive_id
        ];
    }

    public function archivo()
    {
        return $this->morphOne(DriveApi::class, 'model');
    }

    public function consejo()
    {
        return $this->belongsTo(Consejo::class, 'consejo_id');
    }

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class, 'estudiante_id');
    }

    public function plantilla()
    {
        return $this->belongsTo(Plantillas::class, 'plantilla_id');
    }

    public function autor()
    {
        return $this->belongsTo(User::class, 'autor_id');
    }

    public function scopeConsejo($query, $value)
    {
        return $query->where('consejo_id', $value);
    }
}
