<?php

namespace Database\Seeders;

use App\Models\Directorio;
use App\Models\Proceso;
use Illuminate\Database\Seeder;

class ProcesoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $directorio = Directorio::query()->activeDirectory();

        // ACTIVOS

        Proceso::create([
            'nombre' => 'Aprobación y reforma Distributivos de Trabajo',
            'estado' => true,
            'directorio_id' => $directorio->id,
        ]);

        Proceso::create([
            'nombre' => 'Titulación Aprobación Propuesta',
            'estado' => true,
            'directorio_id' => $directorio->id,
        ]);

        Proceso::create([
            'nombre' => 'Titulación Examen Complexivo',
            'estado' => true,
            'directorio_id' => $directorio->id,
        ]);

        // NO ACTIVOS

        $directorio = Directorio::query()->where('estado', 'false')->first();

        Proceso::create([
            'nombre' => 'Becas de excelencia académica',
            'estado' => false,
            'directorio_id' => $directorio->id,
        ]);
    }
}
