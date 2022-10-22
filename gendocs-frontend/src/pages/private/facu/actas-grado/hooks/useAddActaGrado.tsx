import { subYears } from "date-fns";
import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import {
  IAddActaGrado,
  IEstadoActa,
  ITipoActaGrado,
  useAddActaGradoProps,
} from "models/interfaces/IActaGrado";
import { IModalidadActaGrado } from "models/interfaces/IModalidadActaGrado";
import { INumeracionBase } from "models/interfaces/INumeracion";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { addActaGrado } from "services/actas-grado";
import { getEstadoActasGrado } from "services/estadoActasGrado";
import { getModalidadesActaGrado } from "services/modalidadActaGrado";
import { getNumeracionActaGrado } from "services/numeracion";
import { getTipoActasGrado } from "services/tipoActasGrado";
import { CONSTANTS } from "utils/constants";
import { VALIDATION_MESSAGES as VM } from "utils/messages";
import * as yup from "yup";

const { DURACION_ESTUDIOS, HORAS_PRACTICAS } = CONSTANTS;

const TODAY = new Date();

TODAY.setMinutes(0);

const initialValues: IAddActaGrado = {
  numeracion: 0,
  estudiante: -1,
  presidente: -1,
  canton: -1,
  tipo_acta: -1,
  titulo_bachiller: "",
  fecha_inicio_estudios: subYears(TODAY, DURACION_ESTUDIOS),
  fecha_fin_estudios: null,
  creditos_aprobados: 0,
  fecha_presentacion: null,
  horas_practicas: HORAS_PRACTICAS,
  estado_acta: -1,
  solicitar_especie: false,
  envio_financiero_especie: false,
  modalidad_acta_grado: -1,
  link: "",
  aula: -1,
  duracion: 60,
};

const validationSchema = yup.object().shape({
  numeracion: yup.number().required(VM.required).min(1, VM.invalidOption),
  estudiante: yup
    .number()
    .required(VM.required)
    .min(1, VM.invalidOption)
    .typeError(VM.required),
  presidente: yup.number().nullable(),
  canton: yup
    .number()
    .required(VM.required)
    .min(1, VM.invalidOption)
    .typeError(VM.required),
  tipo_acta: yup
    .string()
    .required(VM.required)
    .test("invalid-option", VM.required, (v) => v !== "-1"),
  titulo_bachiller: yup.string().required(VM.required),
  fecha_inicio_estudios: yup.date().required(VM.required),
  fecha_fin_estudios: yup
    .date()
    .nullable()
    .min(yup.ref("fecha_inicio_estudios"), VM.invalidDate),
  creditos_aprobados: yup
    .number()
    .required(VM.required)
    .min(1, VM.invalidOption),
  fecha_presentacion: yup.date().min(TODAY, VM.invalidDate).nullable(),
  horas_practicas: yup.number(),
  estado_acta: yup.number().nullable(),
  solicitar_especie: yup.boolean(),
  envio_financiero_especie: yup.boolean(),
  modalidad_acta_grado: yup.string().required(VM.required),
  link: yup.string().nullable(),
  aula: yup.number().nullable(),
  duracion: yup.number().required(VM.required).min(1, VM.invalidOption),
});

export const useAddActaGrado = ({ estudiante }: useAddActaGradoProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [estadoActas, setEstadoActas] = useState<IEstadoActa[]>([]);
  const [modalidades, setModalidades] = useState<IModalidadActaGrado[]>([]);
  const [tipoActasGrado, setTipoActasGrado] = useState<ITipoActaGrado[]>([]);

  const [fetchingRequiredData, setFetchingRequiredData] = useState(false);

  const [encolados, setEncolados] = useState<INumeracionBase[]>([]);
  const { errorSummary, setErrorSummary } = useErrorsResponse();

  const onSubmit = async (form: IAddActaGrado) => {
    setErrorSummary(undefined);

    const result = await addActaGrado(form);

    if (result.status === HTTP_STATUS.created) {
      enqueueSnackbar(result.message, { variant: "success" });
      // handleReset();
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setErrorSummary(result.errors);
    }
  };

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema,
  });

  useEffect(() => {
    if (!estudiante) {
      return;
    }

    setFetchingRequiredData(true);

    const {
      carrera: { id: carreraId, creditos },
    } = estudiante;

    Promise.all([
      getTipoActasGrado({
        filters: {
          carrera: carreraId,
        },
      }),
      getNumeracionActaGrado({
        filters: {
          carrera: carreraId,
        },
      }),
      getEstadoActasGrado(),
      getModalidadesActaGrado(),
    ])
      .then((r) => {
        const [_tiposActasGrado, _numeracion, estadoActas, modalidades] = r;

        setTipoActasGrado(_tiposActasGrado);

        formik.setFieldValue("numeracion", _numeracion.data.siguiente);

        setEstadoActas(estadoActas);
        setModalidades(modalidades);

        setEncolados(_numeracion.data.encolados);
      })
      .finally(() => {
        formik.setFieldValue("creditos_aprobados", creditos);
        setFetchingRequiredData(false);
      });
  }, [estudiante]);

  const handleReset = () => {
    formik.resetForm();
    setErrorSummary(undefined);
  };

  return {
    formik,
    encolados,
    modalidades,
    handleReset,
    estadoActas,
    errorSummary,
    tipoActasGrado,
    fetchingRequiredData,
  };
};
