import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { IProceso } from "models/interfaces";
import { useSnackbar } from "notistack";
import { saveProceso } from "services";
import { VALIDATION_MESSAGES } from "utils";
import * as yup from "yup";

const initialValues: IProceso = {
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

export const useAddProceso = () => {
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (form: IProceso) => {
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
