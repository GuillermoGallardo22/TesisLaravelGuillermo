<?php

namespace App\Http\Resources;

use Arr;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ActaGradoResource extends JsonResource
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
                "aula" => $this->when(Str::contains($include, 'aula'), AulaResource::make($this->aula)),
                "modalidad_acta_grado" => $this->when(Str::contains($include, 'modalidad'), ModalidadActaGradoResource::make($this->modalidad)),
                "estudiante" => $this->when(Str::contains($include, 'estudiante'), EstudianteResource::make($this->estudiante)),
                "canton" => $this->when(Str::contains($include, 'canton'), CantonResource::make($this->canton)),
                "tipo_acta" => $this->when(Str::contains($include, 'tipo'), TipoActaGradoResource::make($this->tipo)),
                "estado_acta" => $this->when(Str::contains($include, 'estado'), EstadoActaResource::make($this->estado)),
                "miembros" => $this->when(Str::contains($include, 'miembros'), MiembrosActaGradoResource::collection($this->miembros)),
            ),
        );
    }
}
