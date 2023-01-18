<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class DocenteResource extends JsonResource
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
                // "carrera" => $this->when(Str::contains($include, 'carrera'), $this->carrera),
                "carrera" => $this->when(Str::contains($include, 'carrera'), CarreraResource::make($this->carrera)),
            ),
        );
    }
}
