<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Guillermo',
            'email' => 'gbarcia@uta.edu.ec',
            'password' => Hash::make('12345678'),
        ])->assignRole('Admin');

        User::create([
            'name' => 'Carleeetos',
            'email' => 'cmorales@uta.edu.ec',
            'password' => Hash::make('12345678'),
        ])->assignRole('Reader');
    }
}
