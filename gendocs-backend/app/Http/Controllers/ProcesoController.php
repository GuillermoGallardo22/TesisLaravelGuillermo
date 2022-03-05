<?php

namespace App\Http\Controllers;

use App\Constants\Pagination;
use App\Constants\Query;
use App\Http\Requests\StoreProcesoRequest;
use App\Http\Requests\UpdateProcesoRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Directorio;
use App\Models\GoogleDrive;
use App\Models\Proceso;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class ProcesoController extends Controller
{

    protected GoogleDrive $googleDrive;

    /**
     * @param GoogleDrive $googleDrive
     */
    public function __construct(GoogleDrive $googleDrive)
    {
        $this->authorizeResource(Proceso::class);
        $this->googleDrive = $googleDrive;
    }

    public function index(Request $request)
    {
        $query = Proceso::query()->fromActiveDirectory();

        $query->applyFilters($request->all());

        $paginate = $query->applyPaginate($request->all());

        if ($paginate['isPageable']) {
            return ResourceCollection::make(
                $query->paginate($paginate['size'], '*', $paginate['param'], $paginate['number'])
            );
        }

        return ResourceCollection::make($query->get());
    }

    public function store(StoreProcesoRequest $request)
    {
        $proceso = new Proceso($request->validated());

        $directorio = Directorio::query()->activeDirectory();

        $proceso->directorio_id = $directorio->id;

        $proceso->drive_id = $this->googleDrive->create($proceso->nombre, "folder", $directorio->drive_id)->id;

        $proceso->save();

        return ResourceObject::make($proceso);
    }

    public function show(Proceso $proceso)
    {
        return ResourceObject::make($proceso);
    }

    public function update(UpdateProcesoRequest $request, Proceso $proceso)
    {
        $validated = $request->validated();

        $needsUpdateOnDrive = $proceso->nombre != $validated['nombre'];

        $proceso->fill($validated);

        if ($proceso->isDirty()) {

            if ($needsUpdateOnDrive) {
                $this->googleDrive->rename($proceso->drive_id, $validated['nombre']);
            }

            $proceso->save();
        }

        return ResourceObject::make($proceso);
    }

    public function destroy(Proceso $proceso)
    {
        //
    }
}
