<?php

namespace Database\Seeders;

use App\Constants\Parametro as ConstantsParametro;
use App\Models\Parametro;
use Illuminate\Database\Seeder;

class ParametroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Parametro::create([
            'codigo' => ConstantsParametro::CANT_HORA_AULA_OCUP,
            'descripcion' => 'Parámetros para determinar la cantidad de horas que se considerará ocupada un aula',
        ]);
    }
}
