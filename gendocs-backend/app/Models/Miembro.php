<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;

class Miembro extends Model
{
    use HasFactory, SoftDeletes, Filterable, Notifiable;

    protected $fillable = [
        'consejo_id',
        'docente_id',
        'responsable',
        'notificado',
        'asistio',
    ];

    protected $casts = [
        'asistio' => 'boolean',
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
            'asistio' => $this->asistio,
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

    public function docente()
    {
        return $this->belongsTo(Docente::class, 'docente_id');
    }

    /**
     * Route notifications for the mail channel.
     *
     * @param \Illuminate\Notifications\Notification $notification
     * @return array|string
     */
    public function routeNotificationForMail($notification)
    {
        return [$this->docente->correo_uta => $this->docente->nombres];
    }
}
