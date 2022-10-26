<?php

namespace App\Http\Controllers;

use App\Constants\UniqueConstraintNames;
use App\Exceptions\QueryException;
use App\Http\Requests\StoreMiembrosActaGradoRequest;
use App\Http\Requests\UpdateMiembrosActaGradoRequest;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\MiembrosActaGrado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class MiembrosActaGradoController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(MiembrosActaGrado::class, "miembro_acta_grado");
    }

    public function index(Request $request)
    {
        $query = MiembrosActaGrado::query();

        $query->orderBy('created_at');

        $query->applyFilters($request->all());

        return ResourceCollection::make($query->get());
    }

    public function store(StoreMiembrosActaGradoRequest $request)
    {
        $validated = $request->validated();

        try {
            $miembroActaGrado = MiembrosActaGrado::create([
                "docente_id" => $validated["docente"],
                "acta_grado_id" => $validated["actaGrado"],
                "tipo" => $validated["tipo"],
                "informacion_adicional" => $validated["informacion_adicional"],
            ]);

            return ResourceObject::make($miembroActaGrado);
        } catch (\Illuminate\Database\QueryException $ex) {

            $handle = new QueryException($ex);

            $handle->setMessageTranskey("miembro_acta_grado");
            $handle->setUniqueRestrictionNames([
                UniqueConstraintNames::ACTA_GRADO_ACTA_GRADO_ID_DOCENTE_ID,
            ]);

            [$message, $code] = $handle->execute();

            return response($message, $code);
        } catch (\Throwable $th) {
            return response([
                "errors" => $th->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(MiembrosActaGrado $miembrosActaGrado)
    {
        //
    }

    public function update(UpdateMiembrosActaGradoRequest $request, MiembrosActaGrado $miembrosActaGrado)
    {
        //
    }

    public function destroy(MiembrosActaGrado $miembroActaGrado)
    {
        $wasDeleted = $miembroActaGrado->delete();

        if ($wasDeleted) {
            return response()->noContent(Response::HTTP_OK);
        }

        return response()->noContent(Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}
