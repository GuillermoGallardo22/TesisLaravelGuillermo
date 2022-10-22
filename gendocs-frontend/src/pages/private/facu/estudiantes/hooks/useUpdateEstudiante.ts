import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { Genero } from "models/enums/Genero";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { ICarrera } from "models/interfaces/ICarrera";
import { IUpdateEstudiante } from "models/interfaces/IEstudiante";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getAllCarreras } from "services/carreras";
import { getEstudianteById, updateEstudiante } from "services/estudiantes";
import { CONSTANTS } from "utils/constants";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const initialValues: IUpdateEstudiante = {
  id: -1,
  cedula: "",
  nombres: "",
  apellidos: "",
  telefono: "",
  celular: "",
  correo: "",
  correo_uta: "",
  matricula: "",
  folio: "",
  carrera: -1,
  genero: -1,
  fecha_nacimiento: null,
};

export const useUpdateEstudiante = ({ studentId }: { studentId: string }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);
  const [carreras, setCarreras] = useState<ICarrera[]>([]);
  const [estudiante, setEstudiante] = useState(initialValues);
  const { cleanErrorsSumary, errorSummary, setErrorSummary } =
    useErrorsResponse();

  const validationSchema = yup.object().shape({
    cedula: yup
      .string()
      .required(VALIDATION_MESSAGES.required)
      .max(10, VALIDATION_MESSAGES.maxLength(10))
      .typeError(VALIDATION_MESSAGES.required),
    nombres: yup
      .string()
      .required(VALIDATION_MESSAGES.required)
      .max(100, VALIDATION_MESSAGES.maxLength(100))
      .typeError(VALIDATION_MESSAGES.required),
    apellidos: yup
      .string()
      .required(VALIDATION_MESSAGES.required)
      .max(100, VALIDATION_MESSAGES.maxLength(100))
      .typeError(VALIDATION_MESSAGES.required),
    genero: yup
      .mixed()
      .nullable()
      .oneOf(
        [Genero.MASCULINO, Genero.FEMENINO, -1],
        VALIDATION_MESSAGES.invalidOption
      )
      .typeError(VALIDATION_MESSAGES.required),
    fecha_nacimiento: yup
      .date()
      .nullable()
      .typeError(VALIDATION_MESSAGES.invalidDate),
    celular: yup
      .string()
      .nullable()
      .matches(CONSTANTS.PHONE_REGEX, VALIDATION_MESSAGES.invalidFormat)
      .max(10, VALIDATION_MESSAGES.maxLength(10))
      .typeError(VALIDATION_MESSAGES.required),
    telefono: yup
      .string()
      .nullable()
      .matches(CONSTANTS.PHONE_REGEX, VALIDATION_MESSAGES.invalidFormat)
      .max(10, VALIDATION_MESSAGES.maxLength(10))
      .typeError(VALIDATION_MESSAGES.required),
    correo: yup
      .string()
      .nullable()
      .email(VALIDATION_MESSAGES.invalidFormat)
      .max(100, VALIDATION_MESSAGES.maxLength(100))
      .typeError(VALIDATION_MESSAGES.required),
    correo_uta: yup
      .string()
      .required()
      .matches(CONSTANTS.EMAIL_UTA_REGEX, VALIDATION_MESSAGES.invalidFormat)
      .max(100, VALIDATION_MESSAGES.maxLength(100))
      .typeError(VALIDATION_MESSAGES.required),
    matricula: yup
      .string()
      .nullable()
      .max(10, VALIDATION_MESSAGES.maxLength(10))
      .typeError(VALIDATION_MESSAGES.required),
    folio: yup
      .string()
      .nullable()
      .max(10, VALIDATION_MESSAGES.maxLength(10))
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
      getEstudianteById(studentId),
    ]).then((results) => {
      const [_carreras, _estudiante] = results;
      setCarreras(_carreras);
      const { carrera, ...rest } = _estudiante.data;
      setEstudiante({
        ...rest,
        carrera: carrera.id,
      });
    });
  }, [studentId]);

  const onSubmit = async (form: IUpdateEstudiante) => {
    cleanErrorsSumary();

    setSubmitting(true);

    const result = await updateEstudiante(form);

    if (result.status === HTTP_STATUS.ok) {
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      setErrorSummary(result.errors);
    }

    setSubmitting(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: estudiante,
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
