<?php

namespace Database\Seeders;

use App\Models\Numeracion;
use Illuminate\Database\Seeder;

class NumeracionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Numeracion::create([
            'numero' => 1
        ]);
    }
}
