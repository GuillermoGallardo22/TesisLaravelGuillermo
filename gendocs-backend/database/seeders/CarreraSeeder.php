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
            'nombre' => 'Ingeniería en Sistemas Computacionales e Informáticos',
            'desaparecera' => true,
            'titulo_mas' => 'Ingeniero en Sistemas Computacionales e Informáticos',
            'titulo_fem' => 'Ingeniera en Sistemas Computacionales e Informáticos',
            'creditos' => 246,
            'coordinador' => 'Clay Fernando Aldás Flores',
        ]);

        Carrera::create([
            'nombre' => 'Ingeniería en Electrónica y Comunicaciones',
            'desaparecera' => true,
            'titulo_mas' => 'Ingeniero en Electrónica y Comunicaciones',
            'titulo_fem' => 'Ingeniera en Electrónica y Comunicaciones',
            'creditos' => 247,
            'coordinador' => 'Geovanni Danilo Brito Moncayo',
        ]);

        Carrera::create([
            'nombre' => 'Ingeniería Industrial en Procesos de Automatización',
            'desaparecera' => true,
            'titulo_mas' => 'Ingeniero Industrial en Procesos de Automatización',
            'titulo_fem' => 'Ingeniera Industrial en Procesos de Automatización',
            'creditos' => 247,
            'coordinador' => 'Chrisian José Mariño Rivera',
        ]);

        Carrera::create([
            'nombre' => 'Tecnologías de la Información',
            'titulo_mas' => 'Ingeniero en Tecnologías de la Información',
            'titulo_fem' => 'Ingeniera en Tecnologías de la Información',
            'creditos' => 135,
            'coordinador' => 'Clay Fernando Aldás Flores',
        ]);

        Carrera::create([
            'nombre' => 'Telecomunicaciones',
            'titulo_mas' => 'Ingeniero en Telecomunicaciones',
            'titulo_fem' => 'Ingeniera en Telecomunicaciones',
            'creditos' => 135,
            'coordinador' => 'Geovanni Danilo Brito Moncayo',
        ]);

        Carrera::create([
            'nombre' => 'Ingeniería Industrial',
            'titulo_mas' => 'Ingeniero Industrial',
            'titulo_fem' => 'Ingeniera Industrial',
            'creditos' => 135,
            'coordinador' => 'Chrisian José Mariño Rivera',
        ]);

        Carrera::create([
            'nombre' => 'Software',
            'titulo_mas' => 'Ingeniero en Software',
            'titulo_fem' => 'Ingeniera en Software',
            'creditos' => 135,
            'coordinador' => 'Clay Fernando Aldás Flores',
        ]);
    }
}
