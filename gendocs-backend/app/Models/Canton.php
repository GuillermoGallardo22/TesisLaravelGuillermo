<?php

namespace App\Models;

use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Canton extends Model
{
    use HasFactory, Filterable;

    protected $table = 'cantones';

    protected $fillable = [
        'id',
        'nombre',
        'provincia_id',
    ];

    public const FILTERS = ['search'];

    public function fields()
    {
        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'provincia' => $this->provincia,
        ];
    }

    public function scopeSearch($query, $filter)
    {
        return $query->where('nombre', 'like', "%$filter%");
    }

    public function provincia()
    {
        return $this->belongsTo(Provincia::class, 'provincia_id');
    }
}
