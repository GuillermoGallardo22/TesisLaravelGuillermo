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

    public function index()
    {
        $query = Proceso::query();

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
            $query
                ->fromActiveDirectory()
                ->paginate($size, '*', Pagination::NUMBER_PARAM, $number)
        );
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
