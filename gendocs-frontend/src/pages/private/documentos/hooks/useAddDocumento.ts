import { useFormik } from "formik";
import { IConsejo } from "models/interfaces";
import { useEffect, useState } from "react";
import { getConsejos } from "services/consejos";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

interface IDocumentoForm {
    consejo: number;
    proceso: number;
    plantilla: number;
    estudiante: number | null;
    descripcion: string;
}

const initialValues: IDocumentoForm = {
    consejo: -1,
    proceso: -1,
    plantilla: -1,
    estudiante: null,
    descripcion: "",
};

export default function useAddDocumento() {
    const [consejos, setConsejos] = useState<IConsejo[]>([]);

    useEffect(() => {
        let active = true;

        (async () => {
            const result = await getConsejos({
                filters: {
                    estado: 1,
                },
            });
            if (!active) return;

            setConsejos(result.data);
        })();

        return () => {
            active = false;
        };
    }, []);

    const onSubmit = async (form: IDocumentoForm) => {
        alert(JSON.stringify(form, null, 2));
    };

    const validationSchema = yup.object().shape({
        consejo: yup
            .number()
            .required(VALIDATION_MESSAGES.required)
            .positive(VALIDATION_MESSAGES.invalidOption)
            .typeError(VALIDATION_MESSAGES.invalidOption),
        proceso: yup
            .number()
            .required(VALIDATION_MESSAGES.required)
            .positive(VALIDATION_MESSAGES.invalidOption)
            .typeError(VALIDATION_MESSAGES.invalidOption),
        plantilla: yup
            .number()
            .required(VALIDATION_MESSAGES.required)
            .positive(VALIDATION_MESSAGES.invalidOption)
            .typeError(VALIDATION_MESSAGES.invalidOption),
        estudiante: yup.number().nullable(),
        descripcion: yup.string().max(512),
    });

    const formik = useFormik<IDocumentoForm>({
        onSubmit,
        initialValues,
        validationSchema,
    });

    return {
        formik,
        consejos,
    };
}
