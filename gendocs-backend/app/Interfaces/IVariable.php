<?php

namespace App\Interfaces;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;

interface IVariable
{
    public function procecess(): array;
}
