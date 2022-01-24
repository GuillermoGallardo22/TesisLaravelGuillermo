<?php

namespace Database\Seeders;

use App\Models\GoogleDrive;
use App\Models\Directorio;
use Illuminate\Database\Seeder;

class DirectorioSeeder extends Seeder
{
    protected GoogleDrive $googleDrive;

    /**
     * @param GoogleDrive $googleDrive
     */
    public function __construct(GoogleDrive $googleDrive)
    {
        $this->googleDrive = $googleDrive;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Directorio::create([
            'nombre' => 'El origen',
            'fecha_inicio' => '2020-01-01',
            'estado' => false,
            'drive_id' => $this->googleDrive->create("El origen", "folder")->id
        ]);

        Directorio::create([
            'nombre' => 'La resurección',
            'fecha_inicio' => '2021-01-01',
            'estado' => true,
            'drive_id' => $this->googleDrive->create("La resurección", "folder")->id
        ]);
    }
}
