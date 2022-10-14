<?php

namespace App\Rules;

use App\Models\ActaGrado;
use App\Traits\DisponibilidadActa;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Log;

class DisponibilidadDocente implements Rule
{
    use DisponibilidadActa;

    private $duracion;
    private $fecha_presentacion;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($fecha_presentacion, $duracion)
    {
        $this->fecha_presentacion = $fecha_presentacion;
        $this->duracion = $duracion;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $fecha_presentacion = Carbon::parse($this->fecha_presentacion);

        // $rangoI = (clone $fecha_presentacion);
        // $rangoF = (clone $fecha_presentacion)->addMinutes($this->duracion);

        // Log::info([
        //     "duracion" => $this->duracion,
        //     "fecha_presentacion" => $fecha_presentacion->toDateTimeString(),
        //     "rangoI" => $rangoI->toDateTimeString(),
        //     "rangoF" => $rangoF->toDateTimeString(),
        // ]);

        $actas = ActaGrado::query()
            ->where("docente_id", $value)
            ->whereDate("fecha_presentacion", $fecha_presentacion->toDateString())
            ->orderBy("fecha_presentacion")
            ->get();

        // foreach ($actas as $acta) {
        //     $fecha_presentacion_ = Carbon::parse($acta->fecha_presentacion);
        //     $duracion_ = $acta->duracion;

        //     $rangoI_ = (clone $fecha_presentacion_);
        //     $rangoF_ = (clone $fecha_presentacion_)->addMinutes($duracion_);

        //     if (
        //         $rangoI_->toDateTimeString() == $rangoI->toDateTimeString() and
        //         $rangoF_->toDateTimeString() == $rangoF->toDateTimeString()
        //     ) {
        //         return false;
        //     }

        //     if (
        //         $rangoI_->betweenExcluded($rangoI, $rangoF) or
        //         $rangoF_->betweenExcluded($rangoI, $rangoF)
        //     ) {
        //         // Log::error([
        //         //     "id" => $acta->id,
        //         //     "duracion" => $acta->duracion,
        //         //     "fecha_presentacion" => $acta->fecha_presentacion,
        //         //     "rangoI_" => $rangoI_->toDateTimeString(),
        //         //     "rangoF_" => $rangoF_->toDateTimeString(),
        //         // ]);

        //         return false;
        //     }
        // }

        // Log::info("Salió");

        return $this->check($actas, $fecha_presentacion, $this->duracion);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return trans("validation.custom.acta_grado.create.validation.disponibilidad_docente");
    }
}
