<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Str;

class CantonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $include = $request->get('include');

        return array_merge(
            parent::toArray($request),
            array(
                "provincia" => $this->when(Str::contains($include, 'provincia'), ProvinciaResource::make($this->provincia)),
            ),
        );
    }
}
