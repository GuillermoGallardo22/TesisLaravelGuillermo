<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Bus;

class Acta extends Model
{
    use HasFactory, Filterable;

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
            'consejo' => $this->consejo_id,
            'batch' => $this->batch,
        ];
    }

    public function scopeConsejo(Builder $query, $value)
    {
        return $query->where('consejo_id', $value)->first();
    }
}
