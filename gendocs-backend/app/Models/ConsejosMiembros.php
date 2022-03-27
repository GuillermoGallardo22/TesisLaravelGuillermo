<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConsejosMiembros extends Model
{
    use HasFactory, SoftDeletes, Filterable;

    protected $fillable = [
        'consejo_id',
        'miembro_id',
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
            'miembro' => $this->miembro,
            'asistira' => $this->asistira,
            'notificado' => $this->notificado,
            'responsable' => $this->responsable,
        ];
    }

    public function scopeConsejo(Builder $query, $value)
    {
        return $query->where('consejo_id', $value);
    }

    public function consejo()
    {
        return $this->belongsTo(Consejo::class, 'consejo_id');
    }

    public function miembro()
    {
        return $this->belongsTo(Docente::class, 'miembro_id');
    }
}
