import { FormikHelpers, useFormik } from "formik";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { ITipoActaGrado } from "models/interfaces/IActaGrado";
import { ICreateCeldaNota } from "models/interfaces/ICeldaNota";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";
import { createCeldaNota } from "services/celda-notas";
import { VALIDATION_MESSAGES as VM } from "utils/messages";
import * as yup from "yup";

const initialValues: ICreateCeldaNota = {
  variable_nota: "",
  celda: "",
  tipo_acta_grado: -1,
};

const validationSchema = yup.object().shape({
  variable_nota: yup
    .string()
    .required(VM.required)
    .max(100, VM.maxLength(100))
    .matches(/^[a-zA-Z0-9_]*$/, VM.invalidFormat),
  celda: yup
    .string()
    .required(VM.required)
    .max(4, VM.maxLength(4))
    .matches(/^[A-Za-z]{0,2}[0-9]{0,2}$/gm, VM.invalidFormat),
  tipo_acta_grado: yup.number().required(VM.required),
});

export type useAddCeldaProps = {
  tipoActa: ITipoActaGrado;
};

export const useAddCelda = ({ tipoActa }: useAddCeldaProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const client = useQueryClient();

  const onSubmit = async (
    form: ICreateCeldaNota,
    helpers: FormikHelpers<ICreateCeldaNota>
  ) => {
    const result = await createCeldaNota(form);

    if (result.status === HTTP_STATUS.created) {
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }

    client.invalidateQueries(["celda-notas", tipoActa.id]);
    helpers.resetForm();
  };

  const formik = useFormik({
    onSubmit,
    initialValues: {
      ...initialValues,
      tipo_acta_grado: tipoActa.id,
    },
    validationSchema,
  });

  return {
    formik,
  };
};
