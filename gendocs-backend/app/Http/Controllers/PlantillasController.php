<?php

namespace App\Http\Controllers;

use App\Constants\Pagination;
use App\Constants\Query;
use App\Http\Requests\StorePlantillasRequest;
use App\Http\Requests\UpdatePlantillasRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\GoogleDrive;
use App\Models\Plantillas;

use App\Models\Proceso;
use Illuminate\Support\Arr;

class PlantillasController extends Controller
{
    protected GoogleDrive $googleDrive;

    /**
     * @param GoogleDrive $googleDrive
     */
    public function __construct(GoogleDrive $googleDrive)
    {
        $this->authorizeResource(Plantillas::class, 'plantilla');
        $this->googleDrive = $googleDrive;
    }


    public function index()
    {
        $query = Plantillas::query();

        // FILTERS
        $filters = \request()->query(Query::FILTER);

        if ($filters) {
            foreach ($filters as $filter => $value) {
                if (collect(Proceso::FILTERS)->contains($filter)) {
                    $query->$filter($value);
                }
            }
        }

        // PAGINATION
        $pagination = \request()->query(Query::PAGE);

        $size = Pagination::SIZE;
        $number = Pagination::NUMBER;

        if ($pagination) {
            $size = Arr::get($pagination, Pagination::SIZE_TEXT, Pagination::SIZE);
            $size = $size > Pagination::SIZE ? Pagination::SIZE : (int)$size;
            //
            $number = (int)Arr::get($pagination, Pagination::NUMBER_TEXT, Pagination::NUMBER);
        }

        return ResourceCollection::make(
            $query->paginate($size, '*', Pagination::NUMBER_PARAM, $number)
        );
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
