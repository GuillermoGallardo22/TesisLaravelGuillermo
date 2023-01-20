<?php

namespace Database\Seeders;

use App\Constants\ModalidadesActaGrado;
use App\Models\ActaGrado;
use App\Models\Aula;
use App\Models\Canton;
use App\Models\Carrera;
use App\Models\Docente;
use App\Models\EstadoActa;
use App\Models\Estudiante;
use App\Models\ModalidadActaGrado;
use App\Models\TipoActaGrado;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ActaGradoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $carreras = Carrera::orderBy('nombre')->get();

        // $fecha = Carbon::today()->setHour(8)->setMinute(0)->setSecond(0)->addDays(7);

        // foreach ($carreras as $carrera) {

        //     // $docente = Docente::inRandomOrder()->first();
        //     $canton = Canton::inRandomOrder()->first();
        //     $tipoActa = TipoActaGrado::whereHas('carreras', function ($q) use ($carrera) {
        //         $q->where('carrera_id', $carrera->id);
        //     })->get()->random();
        //     $estadoActa = $tipoActa->estados->random()->estadoActaGrado;
        //     $modalidad = ModalidadActaGrado::inRandomOrder()->first();

        //     $estudiante = Estudiante::query()
        //         ->where("carrera_id", $carrera->id)
        //         ->inRandomOrder()
        //         ->first();

        //     $modalidadOptions = [];
        //     $duracion = collect([60, 120])->random();

        //     if ($modalidad->codigo == ModalidadesActaGrado::ONL) {
        //         $modalidadOptions = [
        //             "link" => "https://us05web.zoom.us/j/3140967918?pwd=" . md5(rand()),
        //         ];
        //     } else {
        //         $modalidadOptions = [
        //             "aula_id" => Aula::inRandomOrder()->first()->id,
        //         ];
        //     }

        //     $actaGradoOptions = [
        //         "numero" => "1",
        //         "estudiante_id" => $estudiante->id,
        //         "carrera_id" => $estudiante->carrera->id,
        //         "titulo_bachiller" => "Sistemas computacionales",
        //         "fecha_inicio_estudios" => Carbon::parse("2017-05-05"),
        //         "fecha_fin_estudios" => Carbon::parse("2022-05-05"),
        //         "fecha_presentacion" => $fecha,
        //         "creditos_aprobados" => 400,
        //         "horas_practicas" => 400,
        //         // "docente_id" => $docente->id,
        //         "canton_id" => $canton->id,
        //         "tipo_acta_id" => $tipoActa->id,
        //         "estado_acta_id" => $estadoActa->id,
        //         "modalidad_acta_grado_id" => $modalidad->id,
        //         "directorio_id" => "2",
        //         "created_user_id" => "1",
        //         "solicitar_especie" => rand(0, 1),
        //         "envio_financiero_especie" => rand(0, 1),
        //         "duracion" => $duracion,
        //     ];

        //     ActaGrado::create(array_merge(
        //         $actaGradoOptions,
        //         $modalidadOptions,
        //     ));

        //     $fecha->addMinutes($duracion);
        // }
    }
}
