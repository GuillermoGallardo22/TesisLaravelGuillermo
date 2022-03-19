import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums";
import { IConsejo, IReservaForm } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getConsejos } from "services/consejos";
import { createReserva, getNumeracion } from "services/numeracion";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const initialValues: IReservaForm = {
    desde: -1,
    hasta: -1,
    consejo: -1,
};

export function useAddReserva() {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(true);
    const [consejos, setConsejos] = useState<IConsejo[]>([]);
    const [reserva, setReserva] = useState(initialValues);
    const { errorSummary, setErrorSummary } = useErrorsResponse();

    const validationSchema = yup.object().shape({
        desde: yup
            .number()
            .required(VALIDATION_MESSAGES.required)
            .integer(VALIDATION_MESSAGES.required)
            .positive(VALIDATION_MESSAGES.invalidOption),
        hasta: yup
            .number()
            .required(VALIDATION_MESSAGES.required)
            .integer(VALIDATION_MESSAGES.required)
            .positive(VALIDATION_MESSAGES.invalidOption)
            .moreThan(yup.ref("desde"), VALIDATION_MESSAGES.invalidOption),
        consejo: yup.number().oneOf(
            consejos.map((i) => i.id),
            VALIDATION_MESSAGES.invalidOption
        ),
    });

    useEffect(() => {
        let active = true;

        (async () => {
            setLoading(true);

            const [r1, r2] = await Promise.all([
                getConsejos({
                    filters: {
                        estado: 1,
                    },
                }),
                getNumeracion(),
            ]);

            if (!active) return;

            setConsejos(r1.data);
            setReserva((p) => ({
                ...p,
                desde: r2.siguiente,
            }));

            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, []);

    const onSubmit = async (form: IReservaForm) => {
        setErrorSummary(undefined);

        const result = await createReserva(form);

        if (result.status === HTTP_STATUS.created) {
            // formik.resetForm();
            enqueueSnackbar(result.message, { variant: "success" });
        } else {
            setErrorSummary(result.errors);
            enqueueSnackbar(result.message, { variant: "error" });
        }
    };

    const formik = useFormik<IReservaForm>({
        onSubmit,
        initialValues: reserva,
        enableReinitialize: true,
        validationSchema,
    });

    const refreshNumeracion = () => {
        setLoading(true);

        getNumeracion()
            .then((r) => {
                formik.setFieldValue("desde", r.siguiente);
            })
            .finally(() => setLoading(false));
    };

    return {
        formik,
        loading,
        consejos,
        errorSummary,
        refreshNumeracion,
    };
}
