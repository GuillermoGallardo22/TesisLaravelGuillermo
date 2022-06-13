<?php

namespace Database\Seeders;

use App\Constants\Modulos;
use App\Models\Consejo;
use App\Models\Directorio;
use App\Models\Module;
use Carbon\Carbon;
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
        // Consejo::factory(5)->create();

        $fecha = now()->addDays(2)->setHour(10)->setMinute(0);
        $fFecha = $fecha->format("d/m/Y");

        Consejo::create([
            'nombre' => sprintf("Sesión %s %s", Modulos::FACU, $fFecha),
            'fecha' => $fecha,
            'tipo_consejo_id' => 1,
            'directorio_id' => Directorio::activeDirectory()->id,
            'estado' => true
        ])->module()->create([
            'module_id' => Module::where('code', Modulos::FACU)->first()->id
        ]);

        Consejo::create([
            'nombre' => sprintf("Sesión %s %s", Modulos::SUDE, $fFecha),
            'fecha' => $fecha,
            'tipo_consejo_id' => 1,
            'directorio_id' => Directorio::activeDirectory()->id,
            'estado' => true
        ])->module()->create([
            'module_id' => Module::where('code', Modulos::SUDE)->first()->id
        ]);
    }
}
