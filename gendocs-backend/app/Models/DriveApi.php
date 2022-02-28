<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DriveApi extends Model
{
    use HasFactory;

    protected $fillable = ['google_drive_id'];

    public function model()
    {
        return $this->morphTo();
    }
}
