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
            'code' => Modulos::COMM,
            'name' => 'COMUNES',
        ]);

        Module::create([
            'code' => Modulos::ESTU,
            'name' => 'ESTUDIANTES',
        ]);


        //TITULACION

        Module::create([
            'code' => Modulos::SIST,
            'name' => 'SISTEMAS (UNI-TITU)'
        ]);

        Module::create([
            'code' => Modulos::INPA,
            'name' => 'INDUSTRIAL EN PROCESOS (UNI-TITU)'
        ]);

        Module::create([
            'code' => Modulos::ELEC,
            'name' => 'ELECTRÓNICA Y COMUNICACIONES (UNI-TITU)'
        ]);

        //TITULACION

        //INTEGRACION CURRICULAR

        Module::create([
            'code' => Modulos::SOFT,
            'name' => 'SOFTWARE (UNI-IC)'
        ]);

        Module::create([
            'code' => Modulos::TECI,
            'name' => 'TECNOLOGÍA DE INFORMACIÓN (UNI-IC)'
        ]);

        Module::create([
            'code' => Modulos::TELE,
            'name' => 'TELECOMUNICACIONES (UNI-IC)'
        ]);

        Module::create([
            'code' => Modulos::INDS,
            'name' => 'INDUSTRIAL (UNI-IC)'
        ]);

        //INTEGRACION CURRICULAR
    }
}
