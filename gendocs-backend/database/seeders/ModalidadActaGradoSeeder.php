<?php

namespace Database\Seeders;

use App\Constants\ModalidadesActaGrado;
use App\Models\ModalidadActaGrado;
use Illuminate\Database\Seeder;

class ModalidadActaGradoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ModalidadActaGrado::create([
            'codigo' => ModalidadesActaGrado::ONL,
            'nombre' => 'Online',
        ]);

        ModalidadActaGrado::create([
            'codigo' => ModalidadesActaGrado::PRE,
            'nombre' => 'Presencial',
        ]);
    }
}
