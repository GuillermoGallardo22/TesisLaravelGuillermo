import { subYears } from "date-fns";
import { useFormik } from "formik";
import { useErrorsResponse } from "hooks";
import { ModalidadActaGrado } from "models/enums";
import {
  ICarrera,
  IEstadoActa,
  IEstudiante,
  IModalidadActaGrado,
  ITipoActaGrado,
} from "models/interfaces";
import { useEffect, useMemo, useState } from "react";
import {
  getEstadoActasGrado,
  getModalidadesActaGrado,
  getTipoActasGrado,
} from "services";
import { CONSTANTS } from "utils";

const { DURACION_ESTUDIOS, HORAS_PRACTICAS } = CONSTANTS;

const TODAY = new Date();

type useAddActaGradoProps = {
  estudiante?: IEstudiante | null | undefined;
};

export interface IAddActaGrado {
  estudiante: number | null;
  canton: number | null;
  tipo_acta: number;
  titulo_bachiller: string;
  fecha_inicio_estudios: Date;
  fecha_fin_estudios: Date;
  creditos_aprobados: number;
  fecha_presentacion: Date;
  horas_practicas: number;
  declarada: number;
  solicitar_especie: boolean;
  envio_financiero_especie: boolean;
  miembros_principales: number[];
  miembros_suplentes: number[];
  //
  modalidad_acta_grado: ModalidadActaGrado | number;
  link: string;
  aula: number;
  //
}

export const useAddActaGrado = ({ estudiante }: useAddActaGradoProps) => {
  const [estadoActas, setEstadoActas] = useState<IEstadoActa[]>([]);
  const [modalidades, setModalidades] = useState<IModalidadActaGrado[]>([]);
  const [tipoActasGrado, setTipoActasGrado] = useState<ITipoActaGrado[]>([]);

  const { errorSummary, setErrorSummary } = useErrorsResponse();

  useEffect(() => {
    Promise.all([getEstadoActasGrado(), getModalidadesActaGrado()]).then(
      (r) => {
        const [estadoActas, modalidades] = r;
        setEstadoActas(estadoActas);
        setModalidades(modalidades);
      }
    );
  }, []);

  useEffect(() => {
    if (!estudiante) {
      setTipoActasGrado([]);
      return;
    }

    getTipoActasGrado({
      filters: {
        carrera: estudiante.carrera.id,
      },
    }).then((r) => {
      setTipoActasGrado(r);
    });
  }, [estudiante]);

  const onSubmit = async (form: any) => {
    setErrorSummary(undefined);
  };

  const initialValues = useMemo(
    (): IAddActaGrado => ({
      estudiante: -1,
      canton: -1,
      tipo_acta: -1,
      titulo_bachiller: "",
      fecha_inicio_estudios: subYears(TODAY, DURACION_ESTUDIOS),
      fecha_fin_estudios: TODAY,
      creditos_aprobados: (estudiante?.carrera as ICarrera)?.creditos || 0,
      fecha_presentacion: TODAY,
      horas_practicas: HORAS_PRACTICAS,
      declarada: -1,
      solicitar_especie: false,
      envio_financiero_especie: false,
      miembros_principales: [],
      miembros_suplentes: [],
      modalidad_acta_grado: -1,
      link: "",
      aula: -1,
    }),
    [estudiante]
  );

  const formik = useFormik({
    onSubmit,
    initialValues,
    enableReinitialize: true,
  });

  const handleReset = () => {
    formik.resetForm();
    setErrorSummary(undefined);
  };

  return {
    formik,
    modalidades,
    handleReset,
    estadoActas,
    errorSummary,
    tipoActasGrado,
  };
};
