<?php

namespace Database\Seeders;

use App\Models\Consejo;
use Illuminate\Database\Seeder;

class ConsejoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Consejo::factory(10)->create();
    }
}
