<?php

namespace App\Factories\Variables;

use App\Constants\EstadoActas;
use App\Constants\Genero;
use App\Constants\TipoActaGrados;
use App\Constants\Variables;
use App\Interfaces\IVariable;
use App\Models\Canton;
use App\Models\Estudiante;
use App\Traits\ReplaceableDocText;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class ActaGradoFactory implements IVariable
{
    use ReplaceableDocText;

    const DESIGNACION_GENERO = [
        [
            Genero::FEMENINO => 'la señorita',
            Genero::MASCULINO => 'el señor',
        ],
        [
            Genero::FEMENINO => 'portadora',
            Genero::MASCULINO => 'portador',
        ],
        [
            Genero::FEMENINO => 'La mencionada señorita',
            Genero::MASCULINO => 'El mencionado señor',
        ],
    ];

    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function procecess(): array
    {
        $model = $this->model;

        $now = Carbon::parse($model->fecha_presentacion);

        $estudiante = $model->estudiante;

        $infoAdicionalEstudiante = array(
            // Variables::ESTUDIANTE_TEMA=>$model->tema,
            Variables::ESTUDIANTE_TITULO_BACHILLER => $model->titulo_bachiller,
            Variables::ESTUDIANTE_FECHA_INICIO_ESTUDIOS_FECHAUP => $this->formatDateText($model->fecha_inicio_estudios),
            Variables::ESTUDIANTE_FECHA_FIN_ESTUDIOS_FECHAUP => $this->formatDateText($model->fecha_fin_estudios),
            "{{CREDITOS_TEXTO}}" => $this->converNumberToWords($model->creditos_aprobados),
            "{{CREDITOS_NUMEROS}}" => $model->creditos_aprobados,
            "{{HORAS_PRACTICAS_NUMEROS}}" => $model->horas_practicas,
        );

        // TODO: CREAR VARIABLES PARA TODOS LOS DEMAS TIPOS DE ACTA DE GRADO

        if (
            collect(TipoActaGrados::T_AA, TipoActaGrados::T_PI)->contains($model->tipo->codigo) &&
            $model->estado->codigo == EstadoActas::APRO
        ) {
        } elseif (
            collect(TipoActaGrados::T_AA, TipoActaGrados::T_PI)->contains($model->tipo->codigo) &&
            $model->estado->codigo == EstadoActas::REPR
        ) {
        }

        $variables = collect(array_merge(
            $this->getVariablesFromEstudiante($estudiante),
            $infoAdicionalEstudiante,
            //
            $this->getVariablesFromCanton($model->canton),
            //
            array(
                "{{ACTAGRADO_TIPO}}" => $this->textToUpperLower($model->tipo->nombre, "upper"),
                "{{ACTAGRADO_TEMA}}" => $this->textToUpperLower($model->tema, "upper"),
                //

                //
                Variables::NUMDOC => $this->format_NUMACT($model->numero),
                Variables::Y => $this->format_Y($now),
                //
                Variables::FECHA => $this->formatDate($now),
                // Variables::RESPONSABLE => $consejo->responsable->docente->nombres,
                //
                // Variables::NUMACT => $this->format_NUMACT($numActa),
                // Variables::FECHA_U => $this->format_FECHA_U($fecha),
                // Variables::SESIONUP => strtoupper($tipoConsejo->nombre),
                // Variables::SESION_L => mb_strtolower($tipoConsejo->nombre),
                Variables::Y => $this->format_Y($now),
                Variables::DIASEM_T => $this->format_DIASEM_T($now),
                Variables::NUMMES_T_U => $this->format_NUMMES_T_U($now),
                Variables::MES_T_L => $this->format_MES_T_L($now),
                Variables::DIAS_T => $this->format_NUMDIA_T($now),
                Variables::NUMANIO_T => $this->format_NUMANIO_T($now),
                Variables::NUMANIO_T_L => $this->format_NUMANIO_T_L($now),
                Variables::DIAS_T => $this->format_DIAS_T($now),
                //
                Variables::HORA_T_L => $this->converNumberToWords($now->hour),
                Variables::MINUTOS_T_L => $this->converNumberToWords($now->hour),
                //
                "{{DISNACION_GENERO_0}}" => $this::DESIGNACION_GENERO[0][$estudiante->genero],
                "{{DISNACION_GENERO_1}}" => $this::DESIGNACION_GENERO[1][$estudiante->genero],
                "{{DISNACION_GENERO_2}}" => $this::DESIGNACION_GENERO[2][$estudiante->genero],
                //
                "{{ACTAGRADO_ESTADO_UPPER}}" => $this->textToUpperLower(
                    $estudiante->genero == Genero::FEMENINO ?
                        $model->estado->nombre_fem :
                        $model->estado->nombre_mas,
                    "upper"
                ),
                // Variables::HORA_T_L => $this->converNumberToWords($fecha->hour),
                // Variables::MINUTOS_T_L => $this->converNumberToWords($fecha->minute),
                // Variables::ASISTIERON => $this->asis($asistieron),
                // Variables::NO_ASISTIERON => $this->no_asis($no_asistieron),
            ),
        ));

        $variables = $variables->map(function ($i) {
            return $i != null ? strval($i) : $i;
        });

        return $variables->toArray();
    }

    public function getVariablesFromCanton(Canton $canton)
    {
        return array(
            "{{CANTON}}" => $canton->nombre,
            "{{PROVINCIA}}" => $canton->provincia->nombre,
        );
    }

    public function getVariablesFromEstudiante(Estudiante $estudiante)
    {
        $estudianteFullName = implode(' ', [$estudiante->nombres, $estudiante->apellidos]);
        $carrera = $estudiante->carrera;

        $titulo = $estudiante->genero === Genero::FEMENINO ? $carrera->titulo_fem : $carrera->titulo_mas;

        return array(
            Variables::ESTUDIANTE => mb_convert_encoding(mb_convert_case($estudianteFullName, MB_CASE_TITLE), 'UTF-8'),
            Variables::ESTUDIANTEUP => mb_strtoupper($estudianteFullName, 'UTF-8'),
            Variables::CEDULA => $estudiante->cedula,
            Variables::MATRICULA => $estudiante->matricula,
            Variables::FOLIO => $estudiante->folio,
            Variables::TELEFONO => $estudiante->telefono,
            Variables::CELULAR => $estudiante->celular,
            Variables::CORREO => $estudiante->correo,
            Variables::CORREOUTA => $estudiante->correo_uta,
            Variables::NOMBRECARRERA => $carrera->nombre,
            Variables::NOMBRECARRERAUP => mb_strtoupper($carrera->nombre, 'UTF-8'),
            Variables::ESTUDIANTE_FECHA_NACIMIENTO => $this->formatDateText($estudiante->fecha_nacimiento),
            Variables::ESTUDIANTE_TITULO => $titulo,
            Variables::ESTUDIANTE_TITULO_UPPER => $this->textToUpperLower($titulo, "upper"),
        );
    }
}
