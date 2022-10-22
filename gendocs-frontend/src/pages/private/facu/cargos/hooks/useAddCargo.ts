import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IAddCargo } from "models/interfaces/ICargo";
import { useSnackbar } from "notistack";
import { saveCargo } from "services/cargos";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const initialValues: IAddCargo = {
  docente: -1,
  nombre: "",
  variable: "",
};

type useAddCargoProps = {
  resetForm: () => void;
};

export const validationSchema = yup.object().shape({
  nombre: yup.string().required(VALIDATION_MESSAGES.required),
  variable: yup.string().required(VALIDATION_MESSAGES.required).max(255),
  docente: yup.number().required().positive(),
});

export const useAddCargo = ({ resetForm }: useAddCargoProps) => {
  const { errorSummary, setErrorSummary, cleanErrorsSumary } =
    useErrorsResponse();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (form: IAddCargo) => {
    cleanErrorsSumary();

    const result = await saveCargo(form);

    if (result.status === HTTP_STATUS.created) {
      enqueueSnackbar(result.message, { variant: "success" });
      // RESET
      resetForm();
      formik.resetForm();
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

  return {
    formik,
    errorSummary,
  };
};
