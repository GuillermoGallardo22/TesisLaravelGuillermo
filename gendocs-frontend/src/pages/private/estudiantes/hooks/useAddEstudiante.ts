import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums";
import { ICarrera } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getAllCarreras, saveEstudiante } from "services";
import { CONSTANTS, VALIDATION_MESSAGES } from "utils";
import * as yup from "yup";

export interface SimpleStudentForm {
    cedula: string;
    nombres: string;
    apellidos: string;
    telefono: string;
    celular: string;
    correo: string;
    correo_uta: string;
    matricula: string;
    folio: string;
    carrera: number;
}

const initialValues: SimpleStudentForm = {
    cedula: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    celular: "",
    correo: "",
    correo_uta: "",
    matricula: "",
    folio: "",
    carrera: -1,
};

export const useAddEstudiante = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [carreras, setCarreras] = useState<ICarrera[]>([]);

    const validationSchema = yup.object().shape({
        cedula: yup
            .string()
            .required(VALIDATION_MESSAGES.required)
            .max(10, VALIDATION_MESSAGES.maxLength(10)),
        nombres: yup
            .string()
            .required(VALIDATION_MESSAGES.required)
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
        apellidos: yup
            .string()
            .required(VALIDATION_MESSAGES.required)
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
        celular: yup
            .string()
            .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
            .required(VALIDATION_MESSAGES.required)
            .max(10, VALIDATION_MESSAGES.maxLength(10)),
        telefono: yup
            .string()
            .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
            .max(10, VALIDATION_MESSAGES.maxLength(10)),
        correo: yup
            .string()
            .email(VALIDATION_MESSAGES.invalidFormat)
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
        correo_uta: yup
            .string()
            .matches(
                CONSTANTS.email_uta_regex,
                VALIDATION_MESSAGES.invalidFormat
            )
            .required(VALIDATION_MESSAGES.required)
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
        matricula: yup.string().max(10, VALIDATION_MESSAGES.maxLength(10)),
        folio: yup.string().max(10, VALIDATION_MESSAGES.maxLength(10)),
        carrera: yup
            .mixed()
            .oneOf(
                carreras.map((item) => item.id),
                VALIDATION_MESSAGES.invalidOption
            )
            .required(VALIDATION_MESSAGES.required),
    });

    const { errorSummary, setErrorSummary } = useErrorsResponse();

    const onSubmit = async (form: SimpleStudentForm) => {
        setErrorSummary(undefined);

        const result = await saveEstudiante({ ...form, id: -1 });

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
