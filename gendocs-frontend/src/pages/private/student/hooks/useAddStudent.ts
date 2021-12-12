import { useFormik } from "formik";
import { ICarrera } from "models/interfaces";
import { useState } from "react";
import { CONSTANTS } from "utils/constants";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

export interface SimpleStudentForm {
    cedula: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    celular: string,
    email: string,
    email_uta: string,
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
    email: "",
    email_uta: "",
    matricula: "",
    folio: "",
    carrera: -1,
};

export const useAddSimpleStudent = () => {

    const [carreras, setCarreras] = useState<ICarrera[]>([{ id: 1, nombre: "Sistemas" }, { id: 2, nombre: "Electrónica" }, { id: 3, nombre: "Industrial" }]);

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
        email: yup.string()
            .email(VALIDATION_MESSAGES.invalidFormat)
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
        email_uta: yup.string()
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

    const onSubmit = async (form: SimpleStudentForm) => {
        alert(JSON.stringify(form, null, 2));
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return {
        formik,
        submitting,
        carreras,
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

interface BaseMultipleStudentForm {
    carrera: number,
    students: MultipleStudentForm[]
}

export const useAddMultipleStudent = () => {

    const [carreras, setCarreras] = useState<ICarrera[]>([{ id: 1, nombre: "Sistemas" }, { id: 2, nombre: "Electrónica" }, { id: 3, nombre: "Industrial" }]);

    const validationSchema = yup.object().shape({
        carrera: yup.mixed()
            .oneOf(carreras.map(item => item.id), VALIDATION_MESSAGES.invalidOption)
            .required(VALIDATION_MESSAGES.required),
        students: yup.array()
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
                    .email(VALIDATION_MESSAGES.invalidFormat)
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

    const [submitting, setSubmitting] = useState(false);

    const onSubmit = (form: BaseMultipleStudentForm) => {
        console.log({ form });
        alert("ok");
    };

    const formik = useFormik<BaseMultipleStudentForm>({
        initialValues: {
            carrera: -1,
            students: [],
        },
        onSubmit,
        validationSchema,
    });

    return {
        formik,
        carreras,
        submitting,
    };
};
