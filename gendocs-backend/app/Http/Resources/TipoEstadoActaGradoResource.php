<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class TipoEstadoActaGradoResource extends JsonResource
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
                'drive' => $this->archivo->google_drive_id,
                "estado" => $this->when(Str::contains($include, 'estado'), EstadoActaResource::make($this->estadoActaGrado)),
            ),
        );
    }
}
