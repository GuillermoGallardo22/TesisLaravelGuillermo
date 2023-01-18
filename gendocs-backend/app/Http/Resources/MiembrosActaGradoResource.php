<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MiembrosActaGradoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
         // $include = $request->get('include');
        // return array_merge(
        //     parent::toArray($request),
        //     array(
        //         "acta_grado" => $this->when(Str::contains($include, 'acta_grado'), ActaGradoResource::make($this->acta_grado)),
        //         "docente" => $this->when(Str::contains($include, 'docente'), DocenteResource::make($this->docente)),
        //     ),
        // );
        return parent::toArray($request);
    }
}
