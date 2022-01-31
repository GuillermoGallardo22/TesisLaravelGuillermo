<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlantillasRequest;
use App\Http\Requests\UpdatePlantillasRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\GoogleDrive;
use App\Models\Plantillas;

use App\Models\Proceso;

class PlantillasController extends Controller
{
    protected GoogleDrive $googleDrive;

    /**
     * @param GoogleDrive $googleDrive
     */
    public function __construct(GoogleDrive $googleDrive)
    {
        $this->authorizeResource(Plantillas::class);
        $this->googleDrive = $googleDrive;
    }


    public function index()
    {
        $filters = \request()->query('filter');

        $plantillas = Plantillas::query();

        if ($filters) {
            foreach ($filters as $filter => $value) {
                if (collect(Plantillas::FILTERS)->contains($filter)) {
                    $plantillas->$filter($value);
                }
            }
        }

        return ResourceCollection::make($plantillas->paginate(100));
    }

    public function store(StorePlantillasRequest $request)
    {
        $validated = $request->validated();

        $plantilla = new Plantillas($validated);
        $plantilla->proceso_id = $validated['proceso'];

        $plantilla->drive_id = $this->googleDrive->create(
            $validated["nombre"],
            'document',
            Proceso::find($validated['proceso'])->drive_id
        )->id;

        $plantilla->save();

        return ResourceObject::make($plantilla);
    }

    public function show(Plantillas $plantilla)
    {
        return ResourceObject::make($plantilla);
    }

    public function update(UpdatePlantillasRequest $request, Plantillas $plantilla)
    {
        $validated = $request->validated();

        $needsUpdateOnDrive = $plantilla->nombre != $validated['nombre'];

        $plantilla->fill($validated);
        $plantilla->proceso_id = $validated['proceso'];

        if ($plantilla->isDirty()) {

            if ($needsUpdateOnDrive) {
                $this->googleDrive->rename($plantilla->drive_id, $plantilla->nombre);
            }

            $plantilla->save();
        }

        return ResourceObject::make($plantilla);
    }

    public function destroy(Plantillas $plantilla)
    {
        //
    }

    public function movePlantilla(Plantillas $plantilla, Proceso $proceso)
    {

        $oldProceso = Proceso::find($plantilla->proceso_id);

        $plantilla->proceso_id = $proceso->id;

        $temp = $this->googleDrive->move($plantilla->drive_id, $proceso->drive_id, $oldProceso->drive_id);

        $plantilla->save();

        return ResourceObject::make($plantilla);
    }
}
