<?php

namespace Database\Seeders;

use App\Models\TipoConsejo;
use Illuminate\Database\Seeder;

class TipoConsejoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TipoConsejo::create([
            'nombre' => 'Ordinaria'
        ]);

        TipoConsejo::create([
            'nombre' => 'Extraordinaria'
        ]);
    }
}
