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
        Numeracion::create([
            'numero' => 0,
            'usado' => 1,
            'module_id' => Module::where('code', Modulos::FACU)->first()->id,
            'directorio_id' => Directorio::query()->activeDirectory()->id,
        ]);

        Numeracion::create([
            'numero' => 0,
            'usado' => 1,
            'module_id' => Module::where('code', Modulos::SUDE)->first()->id,
            'directorio_id' => Directorio::query()->activeDirectory()->id,
        ]);
    }
}
