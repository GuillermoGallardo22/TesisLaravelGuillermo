<?php

namespace Database\Seeders;

use App\Models\Cargo;
use Illuminate\Database\Seeder;

class CargoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Cargo::create([
            "variable" => "{{COOR_SISTEMAS}}",
            "nombre" => "Coordinador de sistemas",
            "docente_id" => 1,
        ]);

        Cargo::create([
            "variable" => "{{COOR_ELECTRONICA}}",
            "nombre" => "Coordinador de Electrónica",
            "docente_id" => 2,
        ]);

        Cargo::create([
            "variable" => "{{COOR_INDUSTRIAL}}",
            "nombre" => "Coordinador de Industrial",
            "docente_id" => 3,
        ]);
    }
}
