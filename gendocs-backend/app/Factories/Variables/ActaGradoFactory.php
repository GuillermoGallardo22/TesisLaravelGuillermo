<?php

namespace App\Factories\Variables;

use App\Constants\Adjetivo;
use App\Constants\EstadoActas;
use App\Constants\Genero;
use App\Constants\TipoActaGrados;
use App\Constants\TipoAsistenteActaGrado;
use App\Constants\Variables;
use App\Interfaces\IVariable;
use App\Models\Canton;
use App\Models\Estudiante;
use App\Models\MiembrosActaGrado;
use App\Traits\ReplaceableDocText;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

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

    const DESIGNACION_MIEMBROS = [
        TipoAsistenteActaGrado::M_PRINCIPAL => [
            Adjetivo::SINGUL => "designado mediante",
            Adjetivo::PLURAL => "designados mediante",
        ],
        TipoAsistenteActaGrado::M_SUPLENTE => [
            Adjetivo::SINGUL => "principalizado con",
            Adjetivo::PLURAL => "principalizados con",
        ],
    ];

    const NUM_MIEMBROS = 2;

    protected Model $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function procecess(): array
    {
        $model = $this->model;

        $now = Carbon::parse($model->fecha_presentacion)->timezone("GMT-5");

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
        $miembros = $this->miembros($model->miembros);

        $variables = collect(array_merge(
            $this->getVariablesFromEstudiante($estudiante),
            $infoAdicionalEstudiante,
            $miembros,
            //
            $this->getVariablesFromCanton($model->canton),
            //
            array(
                "{{ACTAGRADO_TIPO}}" => $this->textToUpperLower($model->tipo->nombre, "upper"),
                "{{ACTAGRADO_TEMA}}" => $this->textToUpperLower($model->tema, "upper"),
                //
                Variables::NUMDOC => $this->format_NUMACT($model->numero),
                Variables::Y => $this->format_Y($now),
                //
                Variables::FECHA => $this->formatDate($now),
                //
                Variables::Y => $this->format_Y($now),
                Variables::DIASEM_T => $this->format_DIASEM_T($now),
                Variables::NUMMES_T_U => $this->format_NUMMES_T_U($now),
                Variables::MES_T_L => $this->format_MES_T_L($now),
                Variables::DIAS_T => $this->format_NUMDIA_T($now),
                Variables::NUMANIO_T => $this->format_NUMANIO_T($now),
                Variables::NUMANIO_T_L => $this->format_NUMANIO_T_L($now),
                Variables::DIAS_T => $this->format_DIAS_T($now),
                //
                Variables::HORA_MINUTOS_TEXTO_L => $this->format_HORA_MINUTOS_TEXTO_L($now->toTimeString()),
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
            ),
        ));

        $variables = $variables->map(function ($i) {
            return $i != null ? strval($i) : $i;
        });

        return $variables->toArray();
    }

    public function miembros(Collection $miembros)
    {
        $datosPresidente = array();

        $miembroPresidente = $miembros
            ->where('tipo', TipoAsistenteActaGrado::PRESIDENTE)
            ->where('asistio', true)
            ->first();

        if ($miembroPresidente) {
            $datosPresidente = array(
                "{{ACTAGRADO_PRESIDENTE}}" => $miembroPresidente->docente->nombres,
                "{{ACTAGRADO_PRESIDENTE_DOCU_ASIGNACION}}" => $miembroPresidente->informacion_adicional,
            );
        }

        $datosMiembrosTribunal = array();

        $miembrosTribunal = $miembros
            ->whereIn('tipo', [TipoAsistenteActaGrado::M_PRINCIPAL, TipoAsistenteActaGrado::M_SUPLENTE])
            ->where('asistio', true)
            ->sortBy('created_at')
            ->take($this::NUM_MIEMBROS);

        $miembro1 = "NOT_IMPLEMENTED";
        $miembro2 = "NOT_IMPLEMENTED";
        $variable = "NOT_IMPLEMENTED";

        // PRINCIPAL->RESOLUCION => designado mediante/designados mediante
        // SUPLENTE->MEMORADOM => principalizado con/principalizados con

        if ($miembrosTribunal->count() == $this::NUM_MIEMBROS) {

            $m1 = $miembrosTribunal->first();
            $m2 = $miembrosTribunal->last();

            $c = strtolower(mb_substr($m2->docente->nombres, 0, 1)) == "i" ? "e" : "y";

            if ($m1->informacion_adicional == $m2->informacion_adicional) {
                $variable = "%m1 %c %m2, %v %d, de fecha %f";

                $v = $this::DESIGNACION_MIEMBROS[$m1->tipo][Adjetivo::PLURAL];

                $variable = str_replace(
                    array("%m1", "%m2", "%d", "%f", "%c", "%v"),
                    array(
                        $m1->docente->nombres,
                        $m2->docente->nombres,
                        $m1->informacion_adicional,
                        $this->formatDateText($m2->fecha_asignacion),
                        $c,
                        $v,
                    ),
                    $variable,
                );
            } else {
                $variable = "%m1, %v1 %d1 de fecha %f1 %c %m2, %v2 %d2 de fecha %f2";

                $v1 = $this::DESIGNACION_MIEMBROS[$m1->tipo][Adjetivo::SINGUL];
                $v2 = $this::DESIGNACION_MIEMBROS[$m2->tipo][Adjetivo::SINGUL];

                $variable = str_replace(
                    array("%m1", "%d1", "%f1", "%m2", "%d2", "%f2", "%c", "%v1", "%v2"),
                    array(
                        $m1->docente->nombres,
                        $m1->informacion_adicional,
                        $this->formatDateText($m1->fecha_asignacion),
                        //
                        $m2->docente->nombres,
                        $m2->informacion_adicional,
                        $this->formatDateText($m2->fecha_asignacion),
                        //
                        $c,
                        $v1,
                        $v2,
                    ),
                    $variable,
                );
            }

            $miembro1 = $m1->docente->nombres;
            $miembro2 = $m2->docente->nombres;
        }

        $datosMiembrosTribunal = array(
            "{{ACTAGRADO_MIEMBROS}}" => $variable,
            "{{ACTAGRADO_MIEMBRO1}}" => $miembro1,
            "{{ACTAGRADO_MIEMBRO2}}" => $miembro2,
            "{{CREADOPOR}}" => auth()->user()->name,
        );

        return array_merge(
            $datosPresidente,
            $datosMiembrosTribunal,
        );
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
