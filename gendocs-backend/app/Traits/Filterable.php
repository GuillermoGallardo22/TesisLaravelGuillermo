<?php

namespace App\Traits;

use App\Constants\Query;

trait Filterable
{
    public function scopeApplyFilters($builder, $query = [])
    {
        $filters = collect($query)->get(Query::FILTER, []);

        if (!$filters) {
            return $builder;
        }

        if (!count($filters)) {
            return $builder;
        }

        foreach ($filters as $filter => $value) {
            if (collect($this::FILTERS)->contains($filter)) {
                $builder->$filter($value);
            }
        }

        return $builder;
    }
}
