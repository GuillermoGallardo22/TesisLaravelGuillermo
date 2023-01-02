import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IUpdateDocente } from "models/interfaces/IDocente";
import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocente, getDocenteById, updateDocente } from "services/docentes";
import { CONSTANTS } from "utils/constants";
import { VALIDATION_MESSAGES } from "utils/messages";
import { getAllCarreras } from "services/carreras";
import { ICarrera } from "models/interfaces/ICarrera";
import { Genero } from "models/enums/Genero";

import * as yup from "yup";

const initialValues: IUpdateDocente = {
  id: -1,
  cedula: "",
  celular: "",
  correo: "",
  correo_uta: "",
  nombres: "",
  telefono: "",
  genero: -1,
  carrera: -1,
};


export const useUpdateDocente = ({ docenteId }: { docenteId: string }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);
  const [carreras, setCarreras] = useState<ICarrera[]>([]);
  // const { docenteId = "" } = useParams<{ docenteId: string }>();
  const [docente, setDocente] = useState(initialValues);
  const { cleanErrorsSumary, errorSummary, setErrorSummary } =
  useErrorsResponse();

  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    id: yup.number().required(VALIDATION_MESSAGES.required).positive(),
    cedula: yup
      .string()
      .required(VALIDATION_MESSAGES.required)
      .max(15, VALIDATION_MESSAGES.maxLength(15)),
    nombres: yup
      .string()
      .required(VALIDATION_MESSAGES.required)
      .max(500, VALIDATION_MESSAGES.maxLength(500)),
    celular: yup
      .string()
      .matches(CONSTANTS.PHONE_REGEX, VALIDATION_MESSAGES.invalidFormat)
      .required(VALIDATION_MESSAGES.required)
      .max(25, VALIDATION_MESSAGES.maxLength(25)),
    telefono: yup
      .string()
      .nullable()
      .matches(CONSTANTS.PHONE_REGEX, VALIDATION_MESSAGES.invalidFormat)
      .max(25, VALIDATION_MESSAGES.maxLength(25)),
    correo: yup
      .string()
      .nullable()
      .email(VALIDATION_MESSAGES.invalidFormat)
      .max(150, VALIDATION_MESSAGES.maxLength(150)),
    correo_uta: yup
      .string()
      .matches(CONSTANTS.EMAIL_UTA_REGEX, VALIDATION_MESSAGES.invalidFormat)
      .required(VALIDATION_MESSAGES.required)
      .max(150, VALIDATION_MESSAGES.maxLength(150)),
    genero: yup
      .mixed()
      .nullable()
      .oneOf(
        [Genero.MASCULINO, Genero.FEMENINO, -1],
        VALIDATION_MESSAGES.invalidOption
      )
      .typeError(VALIDATION_MESSAGES.required),
    carrera: yup
      .mixed()
      .oneOf(
        carreras.map((item) => item.id),
        VALIDATION_MESSAGES.invalidOption
      )
      .required(VALIDATION_MESSAGES.required)
      .typeError(VALIDATION_MESSAGES.required),
  });

  useEffect(() => {
    Promise.all([
      getAllCarreras({ filters: { estado: 1 } }),
      getDocenteById(docenteId),
    ]).then((results) => {
      const [_carreras, _docente] = results;
      setCarreras(_carreras);
      const { carrera, ...rest } = _docente.data;
      setDocente({
        ...rest,
        carrera: carrera.id,
      });
    });
  }, [docenteId]);

  // const { data } = useQuery(
  //   ["docente", docenteId],
  //   () => getDocente(docenteId),
  //   {
  //     // select: (r) => r.data,
  //     onSuccess: (r) => {
  //       if (r.status !== HTTP_STATUS.ok) {
  //         navigate(-1);
  //       }
  //     },
  //   }
  // );

  // const { errorSummary, setErrorSummary } = useErrorsResponse();

  // const onSubmit = async (form: IDocente) => {
  //   setErrorSummary(undefined);

  //   const result = await updateDocente(form);

  //   if (result.status === HTTP_STATUS.ok) {
  //     enqueueSnackbar(result.message, { variant: "success" });
  //   } else {
  //     enqueueSnackbar(result.message, { variant: "error" });
  //     setErrorSummary(result.errors);
  //   }
  // };

  const onSubmit = async (form: IUpdateDocente) => {
    cleanErrorsSumary();

    setSubmitting(true);

    const result = await updateDocente(form);

    if (result.status === HTTP_STATUS.ok) {
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      setErrorSummary(result.errors);
    }

    setSubmitting(false);
  };


  // const formik = useFormik({
  //   initialValues: data?.data || initialValues,
  //   onSubmit,
  //   validationSchema,
  //   enableReinitialize: true,
  // });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: docente,
    onSubmit,
    validationSchema,
  });

  return {
    formik,
    submitting,
    carreras,
    errorSummary,
  };
};
