<?php

namespace App\Traits;

trait Nameable
{
    protected $prefix = '###';
    protected $separator = '-';
    protected $name = '';

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
}
