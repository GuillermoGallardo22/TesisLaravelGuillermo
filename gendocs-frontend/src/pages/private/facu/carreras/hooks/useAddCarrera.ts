import { useFormik } from "formik";
import { useErrorsResponse } from "hooks";
import { HTTP_STATUS } from "models/enums";
import { ICarrera } from "models/interfaces";
import { useSnackbar } from "notistack";
import { saveCarrera } from "services";
import { VALIDATION_MESSAGES } from "utils";
import * as yup from "yup";

const initialValues: ICarrera = {
  id: -1,
  nombre: "",
  estado: true,
};

const validationSchema = yup.object().shape({
  nombre: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .max(512, VALIDATION_MESSAGES.maxLength(512)),
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
