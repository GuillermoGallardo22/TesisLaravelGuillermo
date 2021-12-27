<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ResourceObject extends JsonResource
{
    public function toArray($request)
    {
        return $this->resource->fields();
    }
}
