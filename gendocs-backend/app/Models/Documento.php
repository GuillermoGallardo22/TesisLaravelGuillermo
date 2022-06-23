<?php

namespace App\Models;

use App\Traits\Filterable;
use App\Traits\Pageable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class Documento extends Model
{
    use HasFactory, Pageable, Filterable, SoftDeletes;

    public const FILTERS = ["consejo", "estudiante", "module"];

    protected $fillable = [
        'consejo_id',
        'estudiante_id',
        'numero',
        'plantilla_id',
        'autor_id',
        'descripcion',
        'variables'
    ];

    protected $casts = [
        'created_at' => 'datetime'
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
            'drive' => $this->archivo?->google_drive_id,
            'creado' => $this->created_at
        ];
    }

    public function scopeEstudiante($query, $value)
    {
        $filter = preg_replace('/\s+/', '%', $value);

        return $query
            ->join('estudiantes', 'estudiantes.id', '=', 'documentos.estudiante_id')
            ->where('estudiantes.cedula', 'like', "%$filter%")
            ->orWhere('estudiantes.matricula', 'like', "%$filter%")
            ->orWhere('estudiantes.folio', 'like', "%$filter%")
            ->orWhere(DB::raw("CONCAT_WS(' ', estudiantes.nombres, estudiantes.apellidos)"), 'like', "%$filter%")
            ->select('documentos.*');
    }

    public function scopeModule($query, $filter)
    {
        return $query->whereHas('consejo', function ($query) use ($filter) {
            $query->whereHas('module', function ($query) use ($filter) {
                $query->where('module_id', Module::query()->where('code', $filter)->first()?->id);
            });
        });
    }

    public function archivo()
    {
        return $this->morphOne(DriveApi::class, 'model');
    }

    public function consejo(): BelongsTo
    {
        return $this->belongsTo(Consejo::class, 'consejo_id');
    }

    public function estudiante(): BelongsTo
    {
        return $this->belongsTo(Estudiante::class, 'estudiante_id');
    }

    public function plantilla()
    {
        return $this->belongsTo(Plantillas::class, 'plantilla_id')->with(['proceso']);
    }

    public function autor()
    {
        return $this->belongsTo(User::class, 'autor_id');
    }

    public function scopeConsejo($query, $value)
    {
        return $query->where('consejo_id', $value);
    }

    public function docentes()
    {
        return $this->belongsToMany(Docente::class, DocumentoDocente::class, 'documento_id', 'docente_id');
    }
}
