<?php

namespace Database\Seeders;

use App\Models\Provincia;
use Illuminate\Database\Seeder;

class ProvinciaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Provincia::create([
            'id' => 1,
            'nombre' => 'Azuay',
        ]);

        Provincia::create([
            'id' => 2,
            'nombre' => 'Bolívar',
        ]);

        Provincia::create([
            'id' => 3,
            'nombre' => 'Cañar',
        ]);

        Provincia::create([
            'id' => 4,
            'nombre' => 'Carchi',
        ]);

        Provincia::create([
            'id' => 5,
            'nombre' => 'Cotopaxi',
        ]);

        Provincia::create([
            'id' => 6,
            'nombre' => 'Chimborazo',
        ]);

        Provincia::create([
            'id' => 7,
            'nombre' => 'El Oro',
        ]);

        Provincia::create([
            'id' => 8,
            'nombre' => 'Esmeraldas',
        ]);

        Provincia::create([
            'id' => 9,
            'nombre' => 'Guayas',
        ]);

        Provincia::create([
            'id' => 10,
            'nombre' => 'Imbabura',
        ]);

        Provincia::create([
            'id' => 11,
            'nombre' => 'Loja',
        ]);

        Provincia::create([
            'id' => 12,
            'nombre' => 'Los Rios',
        ]);

        Provincia::create([
            'id' => 13,
            'nombre' => 'Manabi',
        ]);

        Provincia::create([
            'id' => 14,
            'nombre' => 'Morona Santiago',
        ]);

        Provincia::create([
            'id' => 15,
            'nombre' => 'Napo',
        ]);

        Provincia::create([
            'id' => 16,
            'nombre' => 'Pastaza',
        ]);

        Provincia::create([
            'id' => 17,
            'nombre' => 'Pichincha',
        ]);

        Provincia::create([
            'id' => 18,
            'nombre' => 'Tungurahua',
        ]);

        Provincia::create([
            'id' => 19,
            'nombre' => 'Zamora Chinchipe',
        ]);

        Provincia::create([
            'id' => 20,
            'nombre' => 'Galápagos',
        ]);

        Provincia::create([
            'id' => 21,
            'nombre' => 'Sucumbíos',
        ]);

        Provincia::create([
            'id' => 22,
            'nombre' => 'Orellana',
        ]);

        Provincia::create([
            'id' => 23,
            'nombre' => 'Santo Domingo de Los Tsáchilas',
        ]);

        Provincia::create([
            'id' => 24,
            'nombre' => 'Santa Elena',
        ]);

        Provincia::create([
            'id' => 25,
            'nombre' => 'Zonas No Delimitadas',
        ]);
    }
}
