import { useFormik } from "formik";
import { IProceso } from "models/interfaces";
import { saveProceso } from "services/proceso";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const initialValues: IProceso = {
    id: -1,
    nombre: "",
    estado: true,
};

const validationSchema = yup.object().shape({
    nombre: yup.string()
        .required(VALIDATION_MESSAGES.required)
        .max(512, VALIDATION_MESSAGES.maxLength(512)),
    estado: yup.boolean()
        .required(VALIDATION_MESSAGES.required),
});

export const useAddProcess = () => {

    const onSubmit = async (form: IProceso) => {
        const result = await saveProceso(form);
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
