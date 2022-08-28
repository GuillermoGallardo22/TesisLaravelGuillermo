<?php

namespace Database\Seeders;

use App\Constants\EstadoActas;
use App\Models\EstadoActa;
use Illuminate\Database\Seeder;

class EstadoActaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        EstadoActa::create([
            'codigo' => EstadoActas::APRO,
            'nombre_mas' => "APROBADO",
            'nombre_fem' => "APROBADA",
        ]);

        EstadoActa::create([
            'codigo' => EstadoActas::REPR,
            'nombre_mas' => "REPROBADO",
            'nombre_fem' => "REPROBADA",
        ]);
    }
}
