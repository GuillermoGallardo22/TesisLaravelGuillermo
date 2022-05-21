<?php

namespace Database\Seeders;

use App\Constants\Modulos;
use App\Models\Module;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Module::create([
            'code' => Modulos::FACU,
            'name' => 'SECRETARÍA DE FACULTAD'
        ]);

        Module::create([
            'code' => Modulos::SUDE,
            'name' => 'SECRETARÍA DE SUBDECANATO'
        ]);

        Module::create([
            'code' => Modulos::TITU,
            'name' => 'SECRETARÍA DE TITULACIÓN'
        ]);
    }
}
