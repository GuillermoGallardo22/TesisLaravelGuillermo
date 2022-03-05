<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection as BaseResourceCollection;

class ResourceCollection extends BaseResourceCollection
{
    public $collects = ResourceObject::class;

    public function toArray($request)
    {
        return $this->collection;
    }
}
