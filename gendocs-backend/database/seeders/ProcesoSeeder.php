<?php

namespace Database\Seeders;

use App\Constants\Modulos;
use App\Models\Directorio;
use App\Models\Module;
use App\Models\Proceso;
use Illuminate\Database\Seeder;

class ProcesoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Proceso::factory(5)->create();

        // $directorio = Directorio::query()->activeDirectory();

        // Proceso::create([
        //     'nombre' => 'Proceso 1 FACU',
        //     'estado' => true,
        //     'directorio_id' => $directorio->id,
        // ])->module()->create([
        //     'module_id' => Module::where('code', Modulos::FACU)->first()->id
        // ]);

        // Proceso::create([
        //     'nombre' => 'Proceso 1 SUDE',
        //     'estado' => true,
        //     'directorio_id' => $directorio->id
        // ])->module()->create([
        //     'module_id' => Module::where('code', Modulos::SUDE)->first()->id,
        // ]);

        // Proceso::create([
        //     'nombre' => 'Proceso 1 TITU',
        //     'estado' => true,
        //     'directorio_id' => $directorio->id
        // ])->module()->create([
        //     'module_id' => Module::where('code', Modulos::TITU)->first()->id,
        // ]);

        // Proceso::create([
        //     'nombre' => 'Proceso 1 CURR',
        //     'estado' => true,
        //     'directorio_id' => $directorio->id
        // ])->module()->create([
        //     'module_id' => Module::where('code', Modulos::CURR)->first()->id,
        // ]);
    }
}
