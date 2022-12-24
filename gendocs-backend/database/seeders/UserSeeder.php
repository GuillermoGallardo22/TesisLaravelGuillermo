<?php

namespace Database\Seeders;

use App\Constants\Modulos;
use App\Constants\Roles;
use App\Models\Module;
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
        $modules = Module::whereIn('code', [Modulos::FACU, Modulos::COMM])->get();

        $user = User::create([
            'name' => 'Guillermo',
            'email' => 'gbarcia@uta.edu.ec',
            'email_gmail' => 'gbarcia@gmail.com',
            'password' => Hash::make('12345678'),
        ]);

        $user->modules()->attach($modules);
        $user->assignRole(Roles::Admin);

        $user = User::create([
            'name' => 'Carleeetos',
            'email' => 'ciza@uta.edu.ec',
            'email_gmail' => 'ciza@gmail.com',
            'password' => Hash::make('12345678'),
        ]);

        $user->modules()->attach($modules);
        $user->assignRole(Roles::Reader);
    }
}
