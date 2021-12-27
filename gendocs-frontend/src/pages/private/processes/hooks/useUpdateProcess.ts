import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { IProceso } from "models/interfaces";
import { useEffect, useState } from "react";
import { getProcesoById, updateProceso } from "services/proceso";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    nombre: yup.string()
        .required(VALIDATION_MESSAGES.required)
        .max(512, VALIDATION_MESSAGES.maxLength(512)),
    estado: yup.boolean()
        .required(VALIDATION_MESSAGES.required),
});

export const useUpdateProcess = ({ processId }: { processId: string }) => {

    const [process, setProcess] = useState<IProceso>({ id: -1, nombre: "", estado: false, });

    useEffect(() => {
        getProcesoById(processId).then(result => {
            if (result.status === HTTP_STATUS.ok) {
                setProcess(result.data);
            }
        });
    }, []);

    const onSubmit = async (form: IProceso) => {
        const result = await updateProceso(form);
    };

    const formik = useFormik({
        initialValues: process,
        onSubmit,
        validationSchema,
        enableReinitialize: true,
    });

    return {
        formik,
    };
};
