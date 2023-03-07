<?php

namespace App\Http\Controllers;

use App\Exceptions\QueryException;
use App\Http\Requests\StoreActaGradoRequest;
use App\Http\Requests\UpdateActaGradoRequest;
use App\Http\Resources\ActaGradoResource;
use App\Http\Resources\ResourceCollection;
use App\Http\Resources\ResourceObject;
use App\Models\ActaGrado;
use App\Models\Carrera;
use App\Models\Directorio;
use App\Models\Estudiante;
use App\Models\ModalidadActaGrado;
use App\Models\NumeracionActaGrado;
use App\Models\TipoActaGrado;
use App\Models\TipoEstadoActaGrado;
use App\Services\ActaGradoService;
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

        // $query ->orderBy('estadoTemp', 'DESC')
        // ->orderBy("numero", "DESC");

        $query
            ->orderBy("numero", "DESC");

        $query->applyFilters($request->all());

        return ActaGradoResource::collection($query->get());
    }

    public function reporteEstudiantePorCarrera()
    {

        $query = ActaGrado::selectRaw('COUNT(carrera_id) AS conteo,carrera_id')->with('carrera')->groupBy('carrera_id');

        // return response($datos);
        return response($query->get()->toJson());
        //  return ResourceCollection::make($query->get());

    }

    public function store(StoreActaGradoRequest $request, ActaGradoService $service)
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
                "numero_aux" => $validated["numero_aux"],
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
                "tema" => $validated["tema"],
            ]);

            $acta->save();

            $acta = $service->generarDocumentoNotas($acta);

            DB::commit();

            return ActaGradoResource::make($acta);
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
        $validated = $request->validated();

        try {
            DB::beginTransaction();
            $actaGrado->creditos_aprobados = $validated["creditos_aprobados"];
            $actaGrado->fecha_inicio_estudios = $validated["fecha_inicio_estudios"];
            $actaGrado->fecha_fin_estudios = $validated["fecha_fin_estudios"];
            $actaGrado->estado_acta_id = $validated["estado_acta"];
            $actaGrado->solicitar_especie = $validated["solicitar_especie"];
            $actaGrado->envio_financiero_especie = $validated["envio_financiero_especie"];
            $actaGrado->horas_practicas = $validated["horas_practicas"];
            $actaGrado->numero_aux = $validated["numero_aux"];
            $actaGrado->fecha_presentacion = $validated["fecha_presentacion"];
            $actaGrado->link = $validated["link"];
            $actaGrado->aula_id = $validated["aula"];
            $actaGrado->tema = $validated["tema"];
            $actaGrado->titulo_bachiller = $validated["titulo_bachiller"];

            $actaGrado->update();

            DB::commit();

            return ActaGradoResource::make($actaGrado);
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

            return response([
                "errors" => $th->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        } finally {
            DB::rollBack();
        }
    }

    public function destroy(ActaGrado $actaGrado)
    {
        $actaGrado->delete();

        return response()->noContent();
    }

    public function generarDocumento(ActaGrado $actaGrado, ActaGradoService $service)
    {
        $this->authorize('update', $actaGrado);

        $plantilla = TipoEstadoActaGrado::query()
            ->where("estado_acta_grado_id", $actaGrado?->estado?->id)
            ->where("tipo_acta_grado_id", $actaGrado?->tipo?->id)
            ->first();

        if (
            $actaGrado->fecha_presentacion == null ||
            $actaGrado->fecha_fin_estudios == null ||
            (!is_numeric($actaGrado->horas_practicas) || (int)($actaGrado->horas_practicas) == 0)
        ) {
            return response(
                [
                    "errors" => trans('validation.custom.acta_grado.documento.create.actaGrado'),
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY,
            );
        }

        if (
            $actaGrado->estudiante->genero == null ||
            $actaGrado->estudiante->fecha_nacimiento == null
        ) {
            return response(
                [
                    "errors" => trans('validation.custom.acta_grado.documento.create.estudiante'),
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY,
            );
        }

        if (!$plantilla) {
            return response(
                [
                    "errors" => trans('validation.custom.acta_grado.documento.create.tipo_estado'),
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY,
            );
        }

        if (!$actaGrado->documento_notas) {
            return response(
                [
                    "errors" => trans('validation.custom.acta_grado.documento.create.documento_notas'),
                ],
                Response::HTTP_UNPROCESSABLE_ENTITY,
            );
        }

        $actaGrado = $service->generarDocumento($actaGrado, $plantilla);
        return ActaGradoResource::make($actaGrado);
    }

    public function generarReporte(Request $request)
    {
        $carrera = $request->get('carrera');
        $fecha_inicio = $request->get('fi');
        $fecha_fin = $request->get('ff');

        $query = ActaGrado::query()->with(['estudiante', 'tipo', 'miembros.docente', 'aula']);

        $query
            ->where('carrera_id', $carrera)
            ->whereBetween("fecha_presentacion", [$fecha_inicio, $fecha_fin])
            // ->orderBy("fecha_presentacion")
            ->orderBy("numero")
            // ->dd()
        ;


        return response()->json([
            "data" => $query->get(),
        ]);
    }

    public function generarReporteInicial(Request $request)
    {
        $carrera = $request->get('carrera');

        $query = ActaGrado::query()->with(['estudiante', 'tipo', 'miembros.docente', 'aula']);

        $query
            ->where('carrera_id', $carrera)
            ->where("fecha_presentacion", null)

            // ->orWhereNull("fecha_presentacion")
            // ->orderBy("fecha_presentacion")
            ->orderBy("numero")
            // ->dd()
        ;


        return response()->json([
            "data" => $query->get(),
        ]);
    }

    public function generarNumeracion(Carrera $carrera)
    {
        $query = ActaGrado::query();

        $result = $query
            ->where("carrera_id", $carrera->id)
            ->whereNotNull("fecha_presentacion")
            ->orderBy("fecha_presentacion")
            ->get();

        for ($i = 0; $i < $result->count(); $i++) {
            $acta = $result[$i];

            $acta->numero_aux = ($i + 1);
            // $acta->duracion = ($i + 1);

            $acta->save();
        }

        // Log::info([
        //     "count" => $result->count(),
        // ]);

        return response()->noContent();
    }


    public function cerrar(Request $request, ActaGrado $actaGrado)
    {
        // Log::info($request->user());
        // Log::info($actaGrado);

        if ($request->user()->cannot('cerrar', $actaGrado)) {
            abort(403);
        }

        $actaGrado->estadoTemp = false;
        $actaGrado->update();

        DB::commit();

        return ActaGradoResource::make($actaGrado);
    }


}
