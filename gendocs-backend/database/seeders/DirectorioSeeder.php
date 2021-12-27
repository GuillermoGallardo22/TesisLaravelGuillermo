<?php

namespace Database\Seeders;

use App\Models\Directorio;
use Illuminate\Database\Seeder;

class DirectorioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Directorio::create([
            'nombre' => 'El origen',
            'fecha_inicio' => '2020-01-01',
            'estado' => false,
        ]);

        Directorio::create([
            'nombre' => 'La resurección',
            'fecha_inicio' => '2021-01-01',
            'estado' => true,
        ]);
    }
}
