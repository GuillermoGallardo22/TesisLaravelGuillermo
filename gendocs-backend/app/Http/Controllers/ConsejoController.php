<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConsejoRequest;
use App\Http\Requests\UpdateConsejoRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\Consejo;
use App\Models\Directorio;
use App\Models\GoogleDrive;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ConsejoController extends Controller
{
    protected GoogleDrive $googleDrive;

    public function __construct(GoogleDrive $googleDrive)
    {
        $this->authorizeResource(Consejo::class);
        $this->googleDrive = $googleDrive;
    }

    public function index(Request $request)
    {
        $query = Consejo::query();

        $query
            ->orderBy('estado', 'DESC')
            ->orderBy('fecha', 'DESC');

        $query->applyFilters($request->all());

        $paginate = $query->applyPaginate($request->all());

        if ($paginate['isPageable']) {
            return ResourceCollection::make(
                $query->paginate($paginate['size'], '*', $paginate['param'], $paginate['number'])
            );
        }

        return ResourceCollection::make($query->get());
    }

    public function store(StoreConsejoRequest $request)
    {
        $validated = $request->validated();

        try {
            DB::beginTransaction();

            $activeDirectory = Directorio::query()->activeDirectory();

            $directorio = $this->googleDrive->create(
                'CONSEJO - ' . $validated['nombre'],
                "folder",
                $activeDirectory->drive_id,
            );

            $consejo = Consejo::create([
                'nombre' => $validated['nombre'],
                'fecha' => new Carbon($validated['fecha']),
                'tipo_consejo_id' => $validated['tipo_consejo'],
                'directorio_id' => $activeDirectory->id,
            ]);

            $consejo->directorio()->create([
                'google_drive_id' => $directorio->id,
            ]);

            DB::commit();

            return ResourceObject::make($consejo);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'errors' => $e->getMessage(),
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function show(Consejo $consejo)
    {
        return ResourceObject::make($consejo);
    }

    public function update(UpdateConsejoRequest $request, Consejo $consejo)
    {
        if (!$consejo->estado) {
            return response()->json([
                'errors' => trans('validation.custom.consejo.update.estado')
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }

        $validated = $request->validated();

        $consejo->fill([
            'nombre' => $validated['nombre'],
            'fecha' => new Carbon($validated['fecha']),
            'tipo_consejo_id' => $validated['tipo_consejo'],
        ]);

        $consejo->save();

        return ResourceObject::make($consejo);
    }

    public function destroy(Consejo $consejo)
    {
        if (!$consejo->estado) {
            return response()->json([
                'errors' => trans('validation.custom.consejo.delete.estado')
            ], ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
        }

        $wasDeleted = $consejo->delete();

        if ($wasDeleted) {
            return response()->noContent(ResponseAlias::HTTP_OK);
        }

        return response()->noContent(ResponseAlias::HTTP_UNPROCESSABLE_ENTITY);
    }
}
