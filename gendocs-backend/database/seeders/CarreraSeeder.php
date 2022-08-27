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
            'nombre' => 'Ingeniería en Sistemas Computacionales e Informaticos',
            'desaparecera' => true,
            'titulo_mas' => 'Ingeniero en Sistemas Computacionales e Informáticos',
            'titulo_fem' => 'Ingeniera en Sistemas Computacionales e Informáticos',
            'creditos' => 246,
        ]);

        Carrera::create([
            'nombre' => 'Ingeniería en Electrónica y Telecomunicaciones',
            'desaparecera' => true,
            'titulo_mas' => 'Ingeniero en Electrónica y Comunicaciones',
            'titulo_fem' => 'Ingeniera en Electrónica y Comunicaciones',
            'creditos' => 246,
        ]);

        Carrera::create([
            'nombre' => 'Ingeniería Industrial en Procesos de Automatización',
            'desaparecera' => true,
            'titulo_mas' => 'Ingeniero Industrial en Procesos de Automatización',
            'titulo_fem' => 'Ingeniera Industrial en Procesos de Automatización',
            'creditos' => 246,
        ]);

        Carrera::create([
            'nombre' => 'Tecnologías de la Información',
            'titulo_mas' => 'Ingeniero en Tecnologías de la Información',
            'titulo_fem' => 'Ingeniera en Tecnologías de la Información',
            'creditos' => 246,
        ]);

        Carrera::create([
            'nombre' => 'Telecomunicaciones',
            'titulo_mas' => 'Ingeniero en Telecomunicaciones',
            'titulo_fem' => 'Ingeniera en Telecomunicaciones',
            'creditos' => 246,
        ]);

        Carrera::create([
            'nombre' => 'Ingeniería Industrial',
            'titulo_mas' => 'Ingeniero Industrial',
            'titulo_fem' => 'Ingeniera Industrial',
            'creditos' => 246,
        ]);

        Carrera::create([
            'nombre' => 'Software',
            'titulo_mas' => 'Ingeniero en Software',
            'titulo_fem' => 'Ingeniera en Software',
            'creditos' => 246,
        ]);
    }
}
