<?php

namespace App\Traits;

use Carbon\Carbon;

trait ReplaceableDocText
{
    public function textToUpperLower($value, $type = "lower" | "upper"): string
    {
        return $type === "lower" ? strtolower($value) : strtoupper($value);
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
}
