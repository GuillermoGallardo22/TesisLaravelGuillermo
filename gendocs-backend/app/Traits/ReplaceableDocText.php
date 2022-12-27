<?php

namespace App\Traits;

use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Log;
use NumberFormatter;
use NumberToWords\NumberToWords;

trait ReplaceableDocText
{
    public function textToUpperLower($value, $type = "lower" | "upper"): string
    {
        return $type === "lower" ? strtolower($value) : mb_strtoupper($value);
    }

    public function formatDate($date, $format = 'd/m/Y'): string
    {
        $date = Carbon::parse($date);
        return $date->format($format);
    }

    public function formatDateText($date, $format = 'd \d\e F \d\e Y'): string
    {
        $date = Carbon::parse($date)->locale('es');
        return $date->translatedFormat($format);
    }

    public function formatDocNumber($number)
    {
        return str_pad($number, 4, '0', STR_PAD_LEFT);
    }

    // -----
    public function converNumberToWords($number)
    {
        if (!is_numeric($number)) {
            return "NO_ES_UN_VALOR_NUMÉRICO";
        }

        $list = explode(".", $number);

        $entera = 0;
        $decimal = 0;

        if (count($list) == 2) {

            $entera = $list[0];
            $decimal = $list[1];

            return implode(" ", array(
                NumberToWords::transformNumber("es", $entera),
                "punto",
                NumberToWords::transformNumber("es", $decimal),
            ));
        } elseif (count($list) == 1) {
            $entera = $list[0];
        }

        return NumberToWords::transformNumber("es", $entera);
    }

    public function getMonthName($date)
    {
        $date = Carbon::parse($date)->locale('es');
        return strtolower($date->translatedFormat('F'));
    }

    public function getDayName($date)
    {
        $date = Carbon::parse($date)->locale('es');
        return strtolower($date->isoFormat('dddd'));
    }

    public function getYearNumber($date)
    {
        $date = Carbon::parse($date)->locale('es');
        return strtolower($date->isoFormat('OY'));
    }
    // -----

    public function format_FECHA_U($date)
    {
        return mb_strtoupper($this->formatDateText($date));
    }

    public function format_NUMACT($number)
    {
        return str_pad($number, 3, '0', STR_PAD_LEFT);
    }

    public function format_Y($date)
    {
        return $this->getYearNumber($date);
    }

    public function format_DIASEM_T($date)
    {
        return mb_strtoupper($this->getDayName($date));
    }

    public function format_DIAS_T(Carbon $date)
    {
        $number = $date->day;
        $words = $this->converNumberToWords($number);
        return strtolower($words) . ' ' . ($number == 1 ? 'día' : 'días');
    }

    public function format_NUMANIO_T(Carbon $date)
    {
        $number = $date->year;
        return mb_strtoupper($this->converNumberToWords($number));
    }

    public function format_NUMANIO_T_L(Carbon $date)
    {
        $number = $date->year;
        return $this->converNumberToWords($number);
    }

    public function format_NUMDIA_T(Carbon $date)
    {
        $number = $date->day;
        return mb_strtoupper($this->converNumberToWords($number));
    }

    public function format_MES_T_L($date)
    {
        return strtolower($this->getMonthName($date));
    }

    public function format_NUMMES_T_U($date)
    {
        return mb_strtoupper($this->getMonthName($date));
    }

    public function asis($asis = [])
    {
        return implode(", ", $asis);
    }

    public function no_asis($asis = [])
    {
        if (!count($asis)) {
            return "";
        }

        return env('NO_ASIS_MENSSAGE') . implode(", ", $asis);
    }

    /**
     * @param string $time la hora a convertir en texto: 13:20
     * @return string texto: trece horas y veinte minutos
     */
    public function format_HORA_MINUTOS_TEXTO_L($time)
    {
        $list = explode(":", $time);

        $hor = 0;
        $min = 0;

        if (count($list) >= 2) {
            $hor = $list[0];
            $min = $list[1];
        }

        $text = implode(" ", array(
            $this->converNumberToWords($hor),
            "horas",
            "y",
            $this->converNumberToWords($min),
            "minutos"
        ));

        Log::info(
            array(
                "time" => $time,
                "hor" => $hor,
                "min" => $min,
                "text" => $text,
            )
        );

        return $text;
    }
}
