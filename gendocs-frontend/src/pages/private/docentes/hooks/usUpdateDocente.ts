import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums";
import { IDocente } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getDocente, updateDocente } from "services";
import { CONSTANTS, VALIDATION_MESSAGES } from "utils";
import * as yup from "yup";

const initialValues: IDocente = {
    id: -1,
    cedula: "",
    celular: "",
    correo: "",
    correo_uta: "",
    nombres: "",
    telefono: "",
};

const validationSchema = yup.object().shape({
    id: yup.number().required(VALIDATION_MESSAGES.required).positive(),
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
        .nullable()
        .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
        .max(25, VALIDATION_MESSAGES.maxLength(25)),
    correo: yup
        .string()
        .nullable()
        .email(VALIDATION_MESSAGES.invalidFormat)
        .max(150, VALIDATION_MESSAGES.maxLength(150)),
    correo_uta: yup
        .string()
        .matches(CONSTANTS.email_uta_regex, VALIDATION_MESSAGES.invalidFormat)
        .required(VALIDATION_MESSAGES.required)
        .max(150, VALIDATION_MESSAGES.maxLength(150)),
});

export const useUpdateDocente = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { docenteId = "" } = useParams<{ docenteId: string }>();
    const navigate = useNavigate();

    const { data } = useQuery(
        ["docente", docenteId],
        () => getDocente(docenteId),
        {
            // select: (r) => r.data,
            onSuccess: (r) => {
                if (r.status !== HTTP_STATUS.ok) {
                    navigate(-1);
                }
            },
        }
    );

    const { errorSummary, setErrorSummary } = useErrorsResponse();

    const onSubmit = async (form: IDocente) => {
        setErrorSummary(undefined);

        const result = await updateDocente(form);

        if (result.status === HTTP_STATUS.ok) {
            enqueueSnackbar(result.message, { variant: "success" });
        } else {
            enqueueSnackbar(result.message, { variant: "error" });
            setErrorSummary(result.errors);
        }
    };

    const formik = useFormik({
        initialValues: data?.data || initialValues,
        onSubmit,
        validationSchema,
        enableReinitialize: true,
    });

    return {
        formik,
        errorSummary,
    };
};
