<?php

namespace App\Traits;

use Carbon\Carbon;

trait Nameable
{
    protected $prefix = '###';
    protected $separator = '-';
    protected $name = '';
    protected $number = '';

    public function setNumber(string $number)
    {
        $this->number = $number;
        return $this;
    }

    public function setPrefix(string $prefix)
    {
        $this->prefix = $prefix;
        return $this;
    }

    public function setSeparator(string $separator)
    {
        $this->separator = $separator;
        return $this;
    }

    public function setName(string $name)
    {
        $this->name = $name;
        return $this;
    }

    public function generateName()
    {
        $p = $this->prefix;
        $s = $this->separator;
        $n = $this->name;

        return sprintf(
            "%s %s %s",
            $p,
            $s,
            $n,
        );
    }

    private function generateNameFile(): string
    {
        $tempName = sprintf(
            "%s_%s",
            Carbon::now()->timestamp,
            $this->number,
        );

        return preg_replace('/\s+/', '_', $tempName);
    }
}
