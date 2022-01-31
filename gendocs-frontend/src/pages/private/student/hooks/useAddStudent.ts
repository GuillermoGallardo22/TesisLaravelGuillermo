import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { ICarrera } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getAllCarreras } from "services/carreras";
import { saveEstudiante, saveListEstudiante } from "services/estudiantes";
import { CONSTANTS } from "utils/constants";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

export interface SimpleStudentForm {
    cedula: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    celular: string,
    correo: string,
    correo_uta: string,
    matricula: string,
    folio: string,
    carrera: number,
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

export const useAddSimpleStudent = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [carreras, setCarreras] = useState<ICarrera[]>([]);

    const validationSchema = yup.object().shape({
        cedula: yup.string()
            .required(VALIDATION_MESSAGES.required)
            .max(10, VALIDATION_MESSAGES.maxLength(10)),
        nombres: yup.string()
            .required(VALIDATION_MESSAGES.required)
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
        apellidos: yup.string()
            .required(VALIDATION_MESSAGES.required)
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
        celular: yup.string()
            .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
            .required(VALIDATION_MESSAGES.required)
            .max(10, VALIDATION_MESSAGES.maxLength(10)),
        telefono: yup.string()
            .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
            .max(10, VALIDATION_MESSAGES.maxLength(10)),
        correo: yup.string()
            .email(VALIDATION_MESSAGES.invalidFormat)
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
        correo_uta: yup.string()
            .matches(CONSTANTS.email_uta_regex, VALIDATION_MESSAGES.invalidFormat)
            .required(VALIDATION_MESSAGES.required)
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
        matricula: yup.string()
            .required(VALIDATION_MESSAGES.required)
            .max(10, VALIDATION_MESSAGES.maxLength(10)),
        folio: yup.string()
            .required(VALIDATION_MESSAGES.required)
            .max(10, VALIDATION_MESSAGES.maxLength(10)),
        carrera: yup.mixed()
            .oneOf(carreras.map(item => item.id), VALIDATION_MESSAGES.invalidOption)
            .required(VALIDATION_MESSAGES.required),
    });

    const [submitting, setSubmitting] = useState(false);
    const [errorSummary, setErrorSummary] = useState<string | string[] | undefined>();

    const onSubmit = async (form: SimpleStudentForm) => {

        setSubmitting(true);
        setErrorSummary(undefined);

        const result = await saveEstudiante({ ...form, id: -1 });

        if (result.status === HTTP_STATUS.created) {
            formik.resetForm();
            enqueueSnackbar(result.message, { variant: "success" });
        } else if (result.status === HTTP_STATUS.forbidden) {
            enqueueSnackbar(result.message, { variant: "error" });
            setErrorSummary(result.message);
        } else {
            setErrorSummary(result.message);
        }

        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    useEffect(() => {
        Promise.all([getAllCarreras()]).then((results) => {
            const [_carreras] = results;
            setCarreras(_carreras);
        });
    }, []);

    return {
        formik,
        submitting,
        carreras,
        errorSummary,
    };
};

export interface MultipleStudentForm {
    id: number,
    cedula: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    celular: string,
    correo: string,
    correo_uta: string,
    matricula: string,
    folio: string,
}

export interface BaseMultipleStudentForm {
    carrera: number,
    estudiantes: MultipleStudentForm[]
}

export const useAddMultipleStudent = () => {

    const { enqueueSnackbar } = useSnackbar();
    const [carreras, setCarreras] = useState<ICarrera[]>([]);

    const validationSchema = yup.object().shape({
        carrera: yup.mixed()
            .oneOf(carreras.map(item => item.id), VALIDATION_MESSAGES.invalidOption)
            .required(VALIDATION_MESSAGES.required),
        estudiantes: yup.array()
            .of(yup.object().shape({
                cedula: yup.string()
                    .required(VALIDATION_MESSAGES.required)
                    .max(10, VALIDATION_MESSAGES.maxLength(10)),
                nombres: yup.string()
                    .required(VALIDATION_MESSAGES.required)
                    .max(100, VALIDATION_MESSAGES.maxLength(100)),
                apellidos: yup.string()
                    .required(VALIDATION_MESSAGES.required)
                    .max(100, VALIDATION_MESSAGES.maxLength(100)),
                celular: yup.string()
                    .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
                    .max(10, VALIDATION_MESSAGES.maxLength(10)),
                telefono: yup.string()
                    .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
                    .max(10, VALIDATION_MESSAGES.maxLength(10)),
                correo: yup.string()
                    // .email(VALIDATION_MESSAGES.invalidFormat)
                    .max(100, VALIDATION_MESSAGES.maxLength(100)),
                correo_uta: yup.string()
                    .matches(CONSTANTS.email_uta_regex, VALIDATION_MESSAGES.invalidFormat)
                    .max(100, VALIDATION_MESSAGES.maxLength(100)),
                matricula: yup.string()
                    .max(10, VALIDATION_MESSAGES.maxLength(10)),
                folio: yup.string()
                    .max(10, VALIDATION_MESSAGES.maxLength(10)),
            }))
            .min(1, VALIDATION_MESSAGES.required)
    });

    const [errorSummary, setErrorSummary] = useState<string | string[] | undefined>();
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (form: BaseMultipleStudentForm) => {
        setSubmitting(true);
        setErrorSummary(undefined);

        const result = await saveListEstudiante(form);

        if (result.status === HTTP_STATUS.created) {
            formik.resetForm();
            enqueueSnackbar(result.message, { variant: "success" });
        } else if (result.status === HTTP_STATUS.forbidden) {
            enqueueSnackbar(result.message, { variant: "error" });
            setErrorSummary(result.message);
        } else {
            setErrorSummary(result.message);
        }

        setSubmitting(false);
    };

    const formik = useFormik<BaseMultipleStudentForm>({
        initialValues: {
            carrera: -1,
            estudiantes: [],
        },
        onSubmit,
        validationSchema,
    });

    useEffect(() => {
        Promise.all([getAllCarreras()]).then((results) => {
            const [_carreras] = results;
            setCarreras(_carreras);
        });
    }, []);

    return {
        formik,
        carreras,
        submitting,
    };
};
