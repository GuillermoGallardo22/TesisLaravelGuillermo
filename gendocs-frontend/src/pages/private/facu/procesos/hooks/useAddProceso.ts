import { useModuleContext } from "contexts/ModuleContext";
import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IProcesoForm } from "models/interfaces/IProceso";
import { useSnackbar } from "notistack";
import { saveProceso } from "services/proceso";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  nombre: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .max(512, VALIDATION_MESSAGES.maxLength(512)),
  estado: yup.boolean().required(VALIDATION_MESSAGES.required),
});

export const useAddProceso = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { module } = useModuleContext();

  const initialValues: IProcesoForm = {
    id: -1,
    nombre: "",
    estado: true,
    module,
  };

  const onSubmit = async (form: IProcesoForm) => {
    const result = await saveProceso(form);

    if (result.status === HTTP_STATUS.created) {
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }

    formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return {
    formik,
  };
};
