import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums";
import { DocenteForm } from "models/interfaces";
import { useSnackbar } from "notistack";
import { saveDocente } from "services";
import { CONSTANTS, VALIDATION_MESSAGES } from "utils";
import * as yup from "yup";

const initialValues: DocenteForm = {
    cedula: "",
    celular: "",
    correo: "",
    correo_uta: "",
    nombres: "",
    telefono: "",
};

export const useAddSimpleDocente = () => {
    const { enqueueSnackbar } = useSnackbar();

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
            .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
            .required(VALIDATION_MESSAGES.required)
            .max(25, VALIDATION_MESSAGES.maxLength(25)),
        telefono: yup
            .string()
            .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
            .max(25, VALIDATION_MESSAGES.maxLength(25)),
        correo: yup
            .string()
            .email(VALIDATION_MESSAGES.invalidFormat)
            .max(150, VALIDATION_MESSAGES.maxLength(150)),
        correo_uta: yup
            .string()
            .matches(
                CONSTANTS.email_uta_regex,
                VALIDATION_MESSAGES.invalidFormat
            )
            .required(VALIDATION_MESSAGES.required)
            .max(150, VALIDATION_MESSAGES.maxLength(150)),
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

    return {
        formik,
        errorSummary,
    };
};
