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
            'name' => 'CONSEJO DIRECTIVO'
        ]);

        Module::create([
            'code' => Modulos::SUDE,
            'name' => 'CONSEJO ACADÉMICO'
        ]);

        Module::create([
            'code' => Modulos::TITU,
            'name' => 'TITULACIÓN'
        ]);

        Module::create([
            'code' => Modulos::CURR,
            'name' => 'INT. CURRICULAR',
        ]);

        Module::create([
            'code' => Modulos::COMM,
            'name' => 'COMUNES',
        ]);
    }
}
