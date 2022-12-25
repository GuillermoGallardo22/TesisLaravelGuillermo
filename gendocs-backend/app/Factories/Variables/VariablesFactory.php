<?php

namespace App\Factories\Variables;

use App\Interfaces\IVariable;
use App\Models\ActaGrado;

class VariablesFactory
{
    public function __construct()
    {
    }

    public function getVariables($model): IVariable
    {
        if ($model instanceof ActaGrado) {
            return new ActaGradoFactory($model);
        } else {
            throw new \Exception("Factory not implemented");
        }
    }
}
