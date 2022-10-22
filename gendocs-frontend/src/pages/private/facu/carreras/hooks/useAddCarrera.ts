import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { ICarrera } from "models/interfaces/ICarrera";
import { useSnackbar } from "notistack";
import { saveCarrera } from "services/carreras";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

export const initialValues: ICarrera = {
  id: -1,
  nombre: "",
  estado: true,
  creditos: 0,
  titulo_mas: "",
  titulo_fem: "",
};

export const validationSchema = yup.object().shape({
  nombre: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .max(512, VALIDATION_MESSAGES.maxLength(512)),
  titulo_mas: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .max(512, VALIDATION_MESSAGES.maxLength(512)),
  titulo_fem: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .max(512, VALIDATION_MESSAGES.maxLength(512)),
  creditos: yup
    .number()
    .required(VALIDATION_MESSAGES.required)
    .positive(VALIDATION_MESSAGES.invalidOption),
  estado: yup.boolean().required(VALIDATION_MESSAGES.required),
});

export const useAddCarrera = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { errorSummary, setErrorSummary } = useErrorsResponse();

  const onSubmit = async (form: ICarrera) => {
    setErrorSummary(undefined);

    const result = await saveCarrera(form);

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

  const handleReset = () => {
    setErrorSummary(undefined);
    formik.resetForm();
  };

  return {
    formik,
    errorSummary,
    handleReset,
  };
};
