<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Pageable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

class Estudiante extends Model
{
    use HasFactory, Pageable, Filterable, Notifiable;

    protected $fillable = [
        "cedula",
        "nombres",
        "apellidos",
        "celular",
        "telefono",
        "correo",
        "correo_uta",
        "matricula",
        "folio",
        "carrera_id"
    ];

    public const FILTERS = ['search'];

    public function fields()
    {
        return [
            'id' => $this->id,
            "cedula" => $this->cedula,
            "nombres" => $this->nombres,
            "apellidos" => $this->apellidos,
            "celular" => $this->celular,
            "telefono" => $this->telefono,
            "correo" => $this->correo,
            "correo_uta" => $this->correo_uta,
            "matricula" => $this->matricula,
            "folio" => $this->folio,
            "carrera" => $this->carrera_id,
        ];
    }

    public function carrera(): BelongsTo|Carrera
    {
        return $this->belongsTo(Carrera::class, "carrera_id");
    }

    public function scopeSearch($query, $filter)
    {
        $filter = preg_replace('/\s+/', '%', $filter);

        return $query
            ->where('cedula', 'like', "%$filter%")
            ->orWhere('matricula', 'like', "%$filter%")
            ->orWhere('folio', 'like', "%$filter%")
            ->orWhere(DB::raw("CONCAT_WS(' ', nombres, apellidos)"), 'like', "%$filter%");
    }

    /**
     * Route notifications for the mail channel.
     *
     * @param \Illuminate\Notifications\Notification $notification
     * @return array|string
     */
    public function routeNotificationForMail($notification)
    {
        // return $this->correo_uta;
        return [$this->correo_uta => $this->nombres . ' ' . $this->apellidos];
    }
}
