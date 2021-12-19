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
            'nombre' => 'El inicio del fin',
            'fecha_inicio' => now(),
            'activo' => true,
        ]);
    }
}
