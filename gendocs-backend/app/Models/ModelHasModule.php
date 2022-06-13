<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelHasModule extends Model
{
    use HasFactory;

    protected $fillable = ['module_id'];

    public function model()
    {
        return $this->morphTo();
    }

    public function modulo()
    {
        return $this->belongsTo(Module::class, 'module_id', 'id');
    }
}
