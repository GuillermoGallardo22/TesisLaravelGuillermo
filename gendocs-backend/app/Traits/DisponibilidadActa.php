<?php

namespace App\Traits;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;

trait DisponibilidadActa
{
    /**
     * check
     * Verifica si dado una lista de actas de grado generadas,
     * no se interpoden en la fecha y duración seleccionada
     * @param Collection $actas Listas de actas
     * @param Carbon $fecha_presentacion Fecha y hora de presentación
     * @param $duracion Duración de la presentación
     * @return bool
     */
    public function check(Collection $actas, Carbon $fecha_presentacion, $duracion)
    {
        $rangoI = (clone $fecha_presentacion);
        $rangoF = (clone $fecha_presentacion)->addMinutes($duracion);

        foreach ($actas as $acta) {

            $fecha_presentacion_ = Carbon::parse($acta->fecha_presentacion);
            $duracion_ = $acta->duracion;

            $rangoI_ = (clone $fecha_presentacion_);
            $rangoF_ = (clone $fecha_presentacion_)->addMinutes($duracion_);

            if (
                $rangoI_->toDateTimeString() == $rangoI->toDateTimeString() and
                $rangoF_->toDateTimeString() == $rangoF->toDateTimeString()
            ) {
                return false;
            }

            if (
                $rangoI_->betweenExcluded($rangoI, $rangoF) or
                $rangoF_->betweenExcluded($rangoI, $rangoF)
            ) {
                // Log::error([
                //     "id" => $acta->id,
                //     "duracion" => $acta->duracion,
                //     "fecha_presentacion" => $acta->fecha_presentacion,
                //     "rangoI_" => $rangoI_->toDateTimeString(),
                //     "rangoF_" => $rangoF_->toDateTimeString(),
                // ]);

                return false;
            }
        }

        return true;
    }
}
