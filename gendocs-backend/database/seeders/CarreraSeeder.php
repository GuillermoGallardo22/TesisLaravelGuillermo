<?php

namespace Database\Seeders;

use App\Models\Carrera;
use App\Models\Directorio;
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
        $primerDirectorio = Directorio::all()->first();

        Carrera::create([
            'nombre' => 'Sistemas Computacionales e Informaticos',
            'siglas' => '',
            'directorio_id' => $primerDirectorio->id,
        ]);

        Carrera::create([
            'nombre' => 'Electrónica y Telecomunicaciones',
            'siglas' => '',
            'directorio_id' => $primerDirectorio->id,
        ]);

        Carrera::create([
            'nombre' => 'Industrial en Procesos de Automatización',
            'siglas' => '',
            'directorio_id' => $primerDirectorio->id,
        ]);

        Carrera::create([
            'nombre' => 'Tecnologías de la Información',
            'siglas' => '',
            'directorio_id' => $primerDirectorio->id,
        ]);

        Carrera::create([
            'nombre' => 'Telecomunicaciones',
            'siglas' => '',
            'directorio_id' => $primerDirectorio->id,
        ]);

        Carrera::create([
            'nombre' => 'Ingeniería Industrial',
            'siglas' => '',
            'directorio_id' => $primerDirectorio->id,
        ]);

        Carrera::create([
            'nombre' => 'Software',
            'siglas' => '',
            'directorio_id' => $primerDirectorio->id,
        ]);
    }
}
