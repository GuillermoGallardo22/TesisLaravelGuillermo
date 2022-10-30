<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Str;

class TipoActaGradoResource extends JsonResource
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

        return [
            'id' => $this->id,
            'nombre' => $this->nombre,
            'codigo' => $this->codigo,
            'drive' => $this->archivo->google_drive_id,
            "estados" => $this->when(Str::contains($include, 'estados'), EstadoActaResource::collection($this->estados)),
            "carreras" => $this->when(Str::contains($include, 'carreras'), CarreraResource::collection($this->carreras)),
            // 'carreras' => ResourceCollection::make($this->carreras),
        ];
    }
}
