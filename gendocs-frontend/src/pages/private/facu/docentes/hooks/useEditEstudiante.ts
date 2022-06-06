import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { ICarrera, IEstudiante } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getAllCarreras, getEstudianteById, updateEstudiante } from "services";
import { CONSTANTS, VALIDATION_MESSAGES } from "utils";
import * as yup from "yup";

const initialValues: IEstudiante = {
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
};

export const useEditEstudiante = ({ studentId }: { studentId: string }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);
  const [carreras, setCarreras] = useState<ICarrera[]>([]);
  const [estudiante, setEstudiante] = useState<IEstudiante>(initialValues);
  const [errorSummary, setErrorSummary] = useState<
    string | string[] | undefined
  >();

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
    celular: yup
      .string()
      .nullable()
      .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
      .max(10, VALIDATION_MESSAGES.maxLength(10))
      .typeError(VALIDATION_MESSAGES.required),
    telefono: yup
      .string()
      .nullable()
      .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
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
      .matches(CONSTANTS.email_uta_regex, VALIDATION_MESSAGES.invalidFormat)
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
      setEstudiante(_estudiante.data);
    });
  }, [studentId]);

  const onSubmit = async (form: IEstudiante) => {
    setErrorSummary(undefined);

    setSubmitting(true);

    const result = await updateEstudiante(form);

    if (result.status === HTTP_STATUS.ok) {
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      setErrorSummary(result.errors || result.message);
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
