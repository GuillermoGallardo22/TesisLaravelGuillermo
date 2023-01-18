<?php

namespace Database\Seeders;

use App\Models\Aula;
use Illuminate\Database\Seeder;

class AulaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Aula::create([
            'nombre' => 'AULA C08',
        ]);

        Aula::create([
            'nombre' => 'AULA F01',
        ]);

        Aula::create([
            'nombre' => 'AULA F02',
        ]);

        Aula::create([
            'nombre' => 'LAB. REDES 2',
        ]);

        Aula::create([
            'nombre' => 'LAB. CTT',
        ]);

        Aula::create([
            'nombre' => 'AUDIOVISUALES',
        ]);

        Aula::create([
            'nombre' => 'AUDITORIO',
        ]);

        Aula::create([
            'nombre' => 'CONSEJO DIRECTIVO',
        ]);

        Aula::create([
            'nombre' => 'CONSEJO ACADÉMICO',
        ]);
    }
}
