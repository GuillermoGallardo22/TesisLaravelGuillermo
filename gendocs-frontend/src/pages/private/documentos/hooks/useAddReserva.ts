import { useFormik } from "formik";
import { useConsejos, useErrorsResponse } from "hooks";
import { HTTP_STATUS } from "models/enums";
import { IReservaForm } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { createReserva, getNumeracion } from "services";
import { VALIDATION_MESSAGES } from "utils";
import * as yup from "yup";

const initialValues: IReservaForm = {
    desde: -1,
    hasta: -1,
    consejo: -1,
};

export function useAddReserva() {
    const { enqueueSnackbar } = useSnackbar();
    const { errorSummary, setErrorSummary } = useErrorsResponse();

    const { data: consejos = [], isLoading: isLoadingC } = useConsejos();

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
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema,
    });

    const { isLoading: isLoadingN, refetch } = useQuery(
        ["numeracion"],
        getNumeracion,
        {
            onSuccess: (r) => formik.setFieldValue("desde", r.siguiente),
            refetchInterval: 2500,
        }
    );

    return {
        formik,
        loading: isLoadingC || isLoadingN,
        consejos,
        errorSummary,
        refreshNumeracion: refetch,
    };
}
