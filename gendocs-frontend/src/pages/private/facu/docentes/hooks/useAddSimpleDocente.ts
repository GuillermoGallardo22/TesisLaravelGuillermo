import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { Genero } from "models/enums/Genero";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { ICarrera } from "models/interfaces/ICarrera";
import { DocenteForm } from "models/interfaces/IDocente";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getAllCarreras } from "services/carreras";
import { saveDocente } from "services/docentes";
import { CONSTANTS } from "utils/constants";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const initialValues: DocenteForm = {
  cedula: "",
  celular: "",
  correo: "",
  correo_uta: "",
  nombres: "",
  telefono: "",
  genero: -1,
  carrera: -1,
};

export const useAddSimpleDocente = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [carreras, setCarreras] = useState<ICarrera[]>([]);

  const validationSchema = yup.object().shape({
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
      .matches(CONSTANTS.PHONE_REGEX, VALIDATION_MESSAGES.invalidFormat)
      .max(25, VALIDATION_MESSAGES.maxLength(25)),
    correo: yup
      .string()
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
      .required(VALIDATION_MESSAGES.required),
  });

  const { errorSummary, setErrorSummary } = useErrorsResponse();

  const onSubmit = async (form: DocenteForm) => {
    setErrorSummary(undefined);

    const result = await saveDocente(form);

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
