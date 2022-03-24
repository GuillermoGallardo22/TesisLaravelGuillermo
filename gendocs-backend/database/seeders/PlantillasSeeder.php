<?php

namespace Database\Seeders;

use App\Models\Plantillas;
use App\Models\User;
use Illuminate\Database\Seeder;

class PlantillasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Plantillas::factory(10)->create();
    }
}
