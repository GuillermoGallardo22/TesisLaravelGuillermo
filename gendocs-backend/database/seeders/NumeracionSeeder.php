<?php

namespace Database\Seeders;

use App\Constants\Modulos;
use App\Models\Directorio;
use App\Models\Module;
use App\Models\Numeracion;
use Illuminate\Database\Seeder;

class NumeracionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $directorio = Directorio::query()->activeDirectory();

        foreach (Module::all() as $module) {
            Numeracion::create([
                'numero' => 0,
                'usado' => 1,
                'module_id' => $module->id,
                'directorio_id' => $directorio->id,
            ]);
        }
    }
}
