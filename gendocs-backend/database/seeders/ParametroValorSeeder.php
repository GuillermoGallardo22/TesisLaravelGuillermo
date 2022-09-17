<?php

namespace Database\Seeders;

use App\Constants\Parametro as ConstantsParametro;
use App\Constants\ParametroValor as ConstantsParametroValor;
use App\Models\Parametro;
use App\Models\ParametroValor;
use Illuminate\Database\Seeder;

class ParametroValorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $parameterParent = Parametro::query()
            ->where("codigo", ConstantsParametro::CANT_HORA_AULA_OCUP)
            ->first();

        ParametroValor::create([
            'codigo' => ConstantsParametroValor::CANT_HORA_AULA_OCUP,
            'descripcion' => 'Parámetro para determinar la cantidad de tiempo (minutos) que se considerará ocupada un aula',
            'valor' => '120',
            'parametro_id' => $parameterParent->id,
        ]);
    }
}
