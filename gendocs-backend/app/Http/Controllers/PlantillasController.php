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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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


    public function index(Request $request)
    {
        $query = Plantillas::query();

        $query->applyFilters($request->all());

        $paginate = $query->applyPaginate($request->all());

        if ($paginate['isPageable']) {
            return ResourceCollection::make(
                $query->paginate($paginate['size'], '*', $paginate['param'], $paginate['number'])
            );
        }

        return ResourceCollection::make($query->get());
    }

    public function store(StorePlantillasRequest $request)
    {
        $validated = $request->validated();

        $plantilla = new Plantillas($validated);
        $plantilla->proceso_id = $validated['proceso'];
        $plantilla->user_id = \request()->user()->id;

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
        try {
            DB::beginTransaction();

            $validated = $request->validated();

            $plantilla->fill([
                'nombre' => $validated['nombre'],
                'estado' => $validated['estado'],
                'proceso_id' => $validated['proceso'],
            ]);

            if ($plantilla->isDirty('nombre')) {
                $this->googleDrive->rename($plantilla->drive_id, $plantilla->nombre);
            }

            if ($plantilla->isDirty('proceso_id')) {
                $fromProceso = Proceso::find($plantilla->getOriginal('proceso_id'));
                $toProceso = Proceso::find($plantilla->proceso_id);

                $this->googleDrive->move($plantilla->drive_id, $toProceso->drive_id, $fromProceso->drive_id);
            }

            $plantilla->save();

            DB::commit();
            return ResourceObject::make($plantilla);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
            ], 422);
        }
    }

    public function destroy(Plantillas $plantilla)
    {
        //
    }
}
