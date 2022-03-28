import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums";
import { IConsejo, IDocumentoForm, INumeracionBase } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getConsejos, getNumeracion, saveDocumento } from "services";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const initialValues: IDocumentoForm = {
    consejo: -1,
    proceso: -1,
    plantilla: -1,
    estudiante: null,
    descripcion: null,
    numero: -1,
};

type useAddDocumentoProps = {
    onReset: () => void;
};

export default function useAddDocumento({ onReset }: useAddDocumentoProps) {
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const [consejos, setConsejos] = useState<IConsejo[]>([]);
    const { errorSummary, setErrorSummary } = useErrorsResponse();

    const [documento, setDocumento] = useState<IDocumentoForm>(initialValues);

    const [encolados, setEncolados] = useState<number[]>([]);
    const [reservados, setReservados] = useState<INumeracionBase[]>([]);

    useEffect(() => {
        let active = true;

        (async () => {
            setLoading(true);

            const [resultC, resultN] = await Promise.all([
                getConsejos({
                    filters: {
                        estado: 1,
                    },
                }),
                getNumeracion(),
            ]);

            if (!active) return;

            setConsejos(resultC.data);

            setReservados(resultN.reservados);
            setEncolados(resultN.encolados);
            setDocumento({
                ...initialValues,
                numero: resultN.siguiente,
            });

            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, []);

    const onSubmit = async (form: IDocumentoForm) => {
        setErrorSummary(undefined);

        const result = await saveDocumento(form);

        if (result.status === HTTP_STATUS.created) {
            enqueueSnackbar(result.message, { variant: "success" });
            handleReset();
        } else {
            enqueueSnackbar(result.message, { variant: "error" });
            setErrorSummary(result.errors);
        }
        refreshNumeracion();
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
        descripcion: yup.string().nullable().max(512),
        numero: yup
            .number()
            .required(VALIDATION_MESSAGES.required)
            .positive(VALIDATION_MESSAGES.invalidOption)
            .integer(VALIDATION_MESSAGES.invalidOption)
            // .test(
            //     "numero-invalido",
            //     VALIDATION_MESSAGES.consejoNumeracion,
            //     (v, c) => test(v, c, reservados)
            // )
            .typeError(VALIDATION_MESSAGES.invalidOption),
    });

    const formik = useFormik<IDocumentoForm>({
        onSubmit,
        initialValues: documento,
        validationSchema,
        enableReinitialize: true,
    });

    const refreshNumeracion = () => {
        setLoading(true);

        getNumeracion()
            .then((r) => {
                setReservados(r.reservados);
                setEncolados(r.encolados);
                formik.setFieldValue("numero", r.siguiente);
            })
            .finally(() => setLoading(false));
    };

    const handleReset = () => {
        formik.resetForm();
        setErrorSummary(undefined);
        if (onReset) {
            onReset();
        }
    };

    return {
        formik,
        consejos,
        encolados,
        reservados,
        loading,
        refreshNumeracion,
        handleReset,
        errorSummary,
    };
}
