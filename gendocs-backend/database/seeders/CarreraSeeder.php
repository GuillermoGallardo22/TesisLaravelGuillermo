<?php

namespace Database\Seeders;

use App\Models\Carrera;
use Illuminate\Database\Seeder;

class CarreraSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Carrera::create([
            'nombre' => 'Sistemas Computacionales e Informaticos',
        ]);

        Carrera::create([
            'nombre' => 'Electrónica y Telecomunicaciones',
        ]);

        Carrera::create([
            'nombre' => 'Industrial en Procesos de Automatización',
        ]);

        Carrera::create([
            'nombre' => 'Tecnologías de la Información',
        ]);

        Carrera::create([
            'nombre' => 'Telecomunicaciones',
        ]);

        Carrera::create([
            'nombre' => 'Ingeniería Industrial',
        ]);

        Carrera::create([
            'nombre' => 'Software',
        ]);
    }
}
