<?php

namespace Database\Seeders;

use App\Constants\Roles;
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
            'email_gmail' => 'gbarcia@gmail.com',
            'password' => Hash::make('12345678'),
        ])->assignRole(Roles::Admin);

        User::create([
            'name' => 'Carleeetos',
            'email' => 'ciza@uta.edu.ec',
            'email_gmail' => 'ciza@gmail.com',
            'password' => Hash::make('12345678'),
        ])->assignRole(Roles::Reader);
    }
}
