<?php

namespace Database\Seeders;

use App\Models\Directorio;
use App\Models\GoogleDrive;
use App\Models\Proceso;
use Illuminate\Database\Seeder;

class ProcesoSeeder extends Seeder
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
        $directorio = Directorio::query()->activeDirectory();

        // ACTIVOS

        Proceso::create([
            'nombre' => 'Aprobación y reforma Distributivos de Trabajo',
            'estado' => true,
            'directorio_id' => $directorio->id,
            'drive_id' => $this->googleDrive->create("Aprobación y reforma Distributivos de Trabajo", "folder", $directorio->drive_id)->id,
        ]);

        Proceso::create([
            'nombre' => 'Titulación Aprobación Propuesta',
            'estado' => true,
            'directorio_id' => $directorio->id,
            'drive_id' => $this->googleDrive->create("Titulación Aprobación Propuesta", "folder", $directorio->drive_id)->id,
        ]);

        Proceso::create([
            'nombre' => 'Titulación Examen Complexivo',
            'estado' => true,
            'directorio_id' => $directorio->id,
            'drive_id' => $this->googleDrive->create("Titulación Examen Complexivo", "folder", $directorio->drive_id)->id,
        ]);

        // NO ACTIVOS

        $directorio = Directorio::query()->where('estado', 'false')->first();

        Proceso::create([
            'nombre' => 'Becas de excelencia académica',
            'estado' => false,
            'directorio_id' => $directorio->id,
            'drive_id' => $this->googleDrive->create("Becas de excelencia académica", "folder", $directorio->drive_id)->id,
        ]);
    }
}
