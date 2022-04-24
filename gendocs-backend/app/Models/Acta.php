<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Bus;

class Acta extends Model
{
    use HasFactory, Filterable, SoftDeletes;

    protected $fillable = [
        'batch',
        'output_path',
        'consejo_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public const FILTERS = ['consejo'];

    public function fields()
    {
        return [
            'id' => $this->id,
            'consejo' => $this->consejo,
            'batch' => $this->getBatch(),
            'drive' => $this->archivo?->google_drive_id,
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

    public function scopeConsejo(Builder $query, $value)
    {
        return $query->where('consejo_id', $value)->first();
    }

    public function getBatch()
    {
        return Bus::findBatch($this->batch);
    }
}
