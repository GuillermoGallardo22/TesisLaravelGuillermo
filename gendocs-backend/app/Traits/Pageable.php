<?php

namespace App\Traits;

use App\Constants\Pagination;
use App\Constants\Query;
use App\Http\Resources\ResourceCollection;
use Illuminate\Support\Arr;

trait Pageable
{
    public function scopeApplyPaginate($builder, $query)
    {
        $pagination = collect($query)->get(Query::PAGE, []);

        if (!$pagination) {
            return [
                'isPageable' => false,
            ];
        }

        if (!count($pagination)) {
            return [
                'isPageable' => false,
            ];
        }

        $size = Arr::get($pagination, Pagination::SIZE_TEXT, Pagination::SIZE);
        $size = $size > Pagination::SIZE ? Pagination::SIZE : (int)$size;

        $number = (int)Arr::get($pagination, Pagination::NUMBER_TEXT, Pagination::NUMBER);

        return [
            'size' => $size,
            'param' => Pagination::NUMBER_PARAM,
            'number' => $number,
            'isPageable' => true,
        ];
    }
}
