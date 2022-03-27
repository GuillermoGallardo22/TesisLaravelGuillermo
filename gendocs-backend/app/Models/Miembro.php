<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Miembro extends Model
{
    use HasFactory, SoftDeletes, Filterable;

    protected $fillable = [
        'consejo_id',
        'docente_id',
        'responsable'
    ];

    protected $casts = [
        'asistira' => 'boolean',
        'notificado' => 'boolean',
        'responsable' => 'boolean',
    ];

    public const FILTERS = ['consejo'];

    public function fields()
    {
        return [
            'id' => $this->id,
            'consejo' => $this->consejo,
            'docente' => $this->docente,
            'asistira' => $this->asistira,
            'notificado' => $this->notificado,
            'responsable' => $this->responsable,
        ];
    }

    public function scopeConsejo(Builder $query, $value)
    {
        return $query->where('consejo_id', $value);
            //->join('docentes', 'miembros.docente_id', 'docentes.id')
            //->orderBy('docentes.nombres', 'ASC');
    }

    public function consejo()
    {
        return $this->belongsTo(Consejo::class, 'consejo_id');
    }

    public function docente()
    {
        return $this->belongsTo(Docente::class, 'docente_id');
    }
}
