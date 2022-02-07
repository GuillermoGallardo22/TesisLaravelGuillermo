import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { IMoveTemplateForm, IProceso } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { movePlantilla } from "services/plantillas";
import { getProcesos } from "services/proceso";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

export const useMoveTemplate = ({ callback }: { callback: () => void }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [procesos, setProcesos] = useState<IProceso[]>([]);

    useEffect(() => {
        getProcesos({ cursor: null }).then((r) => setProcesos(r.data));
    }, []);

    const validationSchema = yup.object().shape({
        plantilla: yup
            .number()
            .required(VALIDATION_MESSAGES.required)
            .min(0, VALIDATION_MESSAGES.required)
            .typeError(VALIDATION_MESSAGES.required),
        proceso: yup
            .mixed()
            .oneOf(
                procesos.map((p) => p.id),
                VALIDATION_MESSAGES.required
            )
            .typeError(VALIDATION_MESSAGES.required),
    });

    const onSubmit = async (form: IMoveTemplateForm) => {
        const result = await movePlantilla(form);

        if (result.status === HTTP_STATUS.ok) {
            enqueueSnackbar(result.message, { variant: "success" });
        } else {
            enqueueSnackbar(result.message, { variant: "error" });
        }

        callback();
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            proceso: -1,
            plantilla: -1,
        },
        onSubmit,
        validationSchema,
    });

    return {
        formik,
        procesos,
    };
};
