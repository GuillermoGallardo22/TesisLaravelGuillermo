import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { Genero } from "models/enums/Genero";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { ICarrera } from "models/interfaces/ICarrera";
import { SimpleStudentForm } from "models/interfaces/IEstudiante";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getAllCarreras } from "services/carreras";
import { saveEstudiante } from "services/estudiantes";
import { CONSTANTS } from "utils/constants";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const initialValues: SimpleStudentForm = {
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

export const useAddEstudiante = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [carreras, setCarreras] = useState<ICarrera[]>([]);

  const validationSchema = yup.object().shape({
    cedula: yup
      .string()
      .required(VALIDATION_MESSAGES.required)
      .max(10, VALIDATION_MESSAGES.maxLength(10)),
    nombres: yup
      .string()
      .required(VALIDATION_MESSAGES.required)
      .max(100, VALIDATION_MESSAGES.maxLength(100)),
    apellidos: yup
      .string()
      .required(VALIDATION_MESSAGES.required)
      .max(100, VALIDATION_MESSAGES.maxLength(100)),
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
      .matches(CONSTANTS.PHONE_REGEX, VALIDATION_MESSAGES.invalidFormat)
      .required(VALIDATION_MESSAGES.required)
      .max(10, VALIDATION_MESSAGES.maxLength(10)),
    telefono: yup
      .string()
      .matches(CONSTANTS.PHONE_REGEX, VALIDATION_MESSAGES.invalidFormat)
      .max(10, VALIDATION_MESSAGES.maxLength(10)),
    correo: yup
      .string()
      .email(VALIDATION_MESSAGES.invalidFormat)
      .max(100, VALIDATION_MESSAGES.maxLength(100)),
    correo_uta: yup
      .string()
      .matches(CONSTANTS.EMAIL_UTA_REGEX, VALIDATION_MESSAGES.invalidFormat)
      .required(VALIDATION_MESSAGES.required)
      .max(100, VALIDATION_MESSAGES.maxLength(100)),
    matricula: yup.string().max(10, VALIDATION_MESSAGES.maxLength(10)),
    folio: yup.string().max(10, VALIDATION_MESSAGES.maxLength(10)),
    carrera: yup
      .mixed()
      .oneOf(
        carreras.map((item) => item.id),
        VALIDATION_MESSAGES.invalidOption
      )
      .required(VALIDATION_MESSAGES.required),
  });

  const { errorSummary, setErrorSummary } = useErrorsResponse();

  const onSubmit = async (form: SimpleStudentForm) => {
    setErrorSummary(undefined);

    const result = await saveEstudiante(form);

    if (result.status === HTTP_STATUS.created) {
      formik.resetForm();
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setErrorSummary(result.errors);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    Promise.all([getAllCarreras({ filters: { estado: 1 } })]).then(
      (results) => {
        const [_carreras] = results;
        setCarreras(_carreras);
      }
    );
  }, []);

  return {
    formik,
    carreras,
    errorSummary,
  };
};
