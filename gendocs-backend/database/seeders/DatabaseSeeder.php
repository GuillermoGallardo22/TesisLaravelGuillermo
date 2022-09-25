<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            ParametroSeeder::class,
            ParametroValorSeeder::class,
            ModuleSeeder::class,
            PermissionsSeeder::class,
            UserSeeder::class,
            DirectorioSeeder::class,
            CarreraSeeder::class,
            ProcesoSeeder::class,
            TipoConsejoSeeder::class,
            NumeracionSeeder::class,
            //
            EstudianteSeeder::class,
            ConsejoSeeder::class,
            // PlantillasSeeder::class,
            DocenteSeeder::class,
            PlantillasGlobalesSeeder::class,
            CargoSeeder::class,
            ProvinciaSeeder::class,
            CantonSeeder::class,
            TipoActaGradoSeeder::class,
            EstadoActaSeeder::class,
            AulaSeeder::class,
            ModalidadActaGradoSeeder::class,
            ActaGradoSeeder::class,
        ]);
    }
}
