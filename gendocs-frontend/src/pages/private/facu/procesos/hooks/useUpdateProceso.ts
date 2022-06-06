import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { IProceso } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getProcesoById, updateProceso } from "services";
import { VALIDATION_MESSAGES } from "utils";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  nombre: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .max(512, VALIDATION_MESSAGES.maxLength(512)),
  estado: yup.boolean().required(VALIDATION_MESSAGES.required),
});

export const useUpdateProceso = ({ processId }: { processId: string }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [process, setProcess] = useState<IProceso>({
    id: -1,
    nombre: "",
    estado: false,
  });

  useEffect(() => {
    getProcesoById(processId).then((result) => {
      if (result.status === HTTP_STATUS.ok) {
        setProcess(result.data);
      }
    });
  }, []);

  const onSubmit = async (form: IProceso) => {
    const result = await updateProceso(form);

    if (result.status === HTTP_STATUS.ok) {
      setProcess(result.data);
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }

    formik.resetForm();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: process,
    onSubmit,
    validationSchema,
  });

  return {
    formik,
  };
};
