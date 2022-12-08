<?php

namespace App\Http\Controllers;

use App\Exceptions\QueryException;
use App\Http\Requests\StoreActaGradoRequest;
use App\Http\Requests\UpdateActaGradoRequest;
use App\Http\Resources\ActaGradoResource;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\ActaGrado;
use App\Models\Directorio;
use App\Models\Estudiante;
use App\Models\ModalidadActaGrado;
use App\Models\NumeracionActaGrado;
use App\Models\TipoActaGrado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class ActaGradoController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(ActaGrado::class);
    }

    public function index(Request $request)
    {
        $query = ActaGrado::query();

        $query->orderBy("numero", "DESC");

        $query->applyFilters($request->all());

        return ActaGradoResource::collection($query->get());
    }

    public function store(StoreActaGradoRequest $request)
    {
        $validated = $request->validated();

        $estudiante = Estudiante::find($validated["estudiante"]);
        $tipoActa = TipoActaGrado::where("codigo", $validated["tipo_acta"])->first();
        $modalidadActa = ModalidadActaGrado::where("codigo", $validated["modalidad_acta_grado"])->first();

        $numero = $validated["numeracion"];

        try {
            DB::beginTransaction();

            $acta = new ActaGrado([
                "numero" => $numero,
                "estudiante_id" => $estudiante->id,
                "canton_id" => $validated["canton"],
                "titulo_bachiller" => $validated["titulo_bachiller"],
                "fecha_inicio_estudios" => $validated["fecha_inicio_estudios"],
                "fecha_fin_estudios" => $validated["fecha_fin_estudios"],
                "creditos_aprobados" => $validated["creditos_aprobados"],
                "tipo_acta_id" => $tipoActa->id,
                "estado_acta_id" => $validated["estado_acta"],
                "solicitar_especie" => $validated["solicitar_especie"],
                "envio_financiero_especie" => $validated["envio_financiero_especie"],
                "duracion" => $validated["duracion"],
                "modalidad_acta_grado_id" => $modalidadActa->id,
                //
                "carrera_id" => $estudiante->carrera->id,
                "directorio_id" => Directorio::activeDirectory()->id,
                "created_user_id" => Auth::id(),
                //
                "horas_practicas" => $validated["horas_practicas"],
                "fecha_presentacion" => $validated["fecha_presentacion"],
                "link" => $validated["link"],
                "aula_id" => $validated["aula"],
            ]);

            $acta->save();

            DB::commit();

            return ResourceObject::make($acta);
        } catch (\Illuminate\Database\QueryException $ex) {

            $handle = new QueryException($ex);

            $handle->setMessageTranskey("acta_grado");
            $handle->setUniqueRestrictionNames([
                "unique_restriction_link_fecha_presentacion",
                "unique_restriction_numero_carrera_id_directorio_id",
            ]);

            [$message, $code] = $handle->execute();

            return response($message, $code);
        } catch (\Throwable $th) {
            Log::error($th);

            return response([
                "errors" => $th->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        } finally {
            DB::rollBack();
        }
    }

    public function show(ActaGrado $actaGrado, Request $request)
    {
        return ActaGradoResource::make($actaGrado);
    }

    public function update(UpdateActaGradoRequest $request, ActaGrado $actaGrado)
    {
        //
    }

    public function destroy(ActaGrado $actaGrado)
    {
        $actaGrado->delete();

        return response()->noContent();
    }
}
