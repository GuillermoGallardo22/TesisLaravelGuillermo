import { subYears } from "date-fns";
import { useFormik } from "formik";
import { useErrorsResponse } from "hooks";
import {
  ICarrera,
  IEstadoActa,
  IEstudiante,
  IModalidadActaGrado,
  ITipoActaGrado,
  IAddActaGrado,
} from "models/interfaces";
import { useEffect, useMemo, useState } from "react";
import {
  getEstadoActasGrado,
  getModalidadesActaGrado,
  getTipoActasGrado,
} from "services";
import { CONSTANTS } from "utils";
import * as yup from "yup";

const { DURACION_ESTUDIOS, HORAS_PRACTICAS = 0 } = CONSTANTS;

const TODAY = new Date();

TODAY.setMinutes(0);

type useAddActaGradoProps = {
  estudiante?: IEstudiante | null | undefined;
};

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
      numeracion: 0,
      estudiante: -1,
      presidente: -1,
      canton: -1,
      tipo_acta: -1,
      titulo_bachiller: "",
      fecha_inicio_estudios: subYears(TODAY, DURACION_ESTUDIOS),
      fecha_fin_estudios: TODAY,
      creditos_aprobados: (estudiante?.carrera as ICarrera)?.creditos || 0,
      fecha_presentacion: null,
      horas_practicas: HORAS_PRACTICAS,
      estado_acta: -1,
      solicitar_especie: false,
      envio_financiero_especie: false,
      modalidad_acta_grado: -1,
      link: "",
      aula: -1,
      duracion: 60,
    }),
    [estudiante]
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        numeracion: yup.number().required().min(1),
        estudiante: yup.number().required().min(1),
        presidente: yup.number().nullable(),
        canton: yup.number().required().min(1),
        tipo_acta: yup
          .number()
          .required()
          .oneOf(tipoActasGrado.map((tag) => tag.id)),
        titulo_bachiller: yup.string().required(),
        fecha_inicio_estudios: yup.date().required(),
        fecha_fin_estudios: yup
          .date()
          .required()
          .min(yup.ref("fecha_inicio_estudios")),
        creditos_aprobados: yup.number().required().min(1),
        fecha_presentacion: yup.date().min(TODAY).nullable(),
        horas_practicas: yup.number(),
        estado_acta: yup.number().min(1),
        solicitar_especie: yup.boolean(),
        envio_financiero_especie: yup.boolean(),
        modalidad_acta_grado: yup
          .string()
          .required()
          .oneOf(modalidades.map((m) => m.codigo)),
        link: yup.string().nullable(),
        aula: yup.number().nullable(),
        duracion: yup.number().nullable(),
      }),
    [tipoActasGrado.length, modalidades.length]
  );

  const formik = useFormik({
    onSubmit,
    initialValues,
    enableReinitialize: true,
    validationSchema,
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
