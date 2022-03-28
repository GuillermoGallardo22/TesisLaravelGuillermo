import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums";
import { ConsejoMiembroForm, IConsejo } from "models/interfaces";
import { useSnackbar } from "notistack";
import { saveMiembros } from "services";
import { VALIDATION_MESSAGES } from "utils";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    docente: yup
        .number()
        .positive(VALIDATION_MESSAGES.invalidOption)
        .required(VALIDATION_MESSAGES.required),
    consejo: yup
        .number()
        .positive(VALIDATION_MESSAGES.invalidOption)
        .required(VALIDATION_MESSAGES.required),
    responsable: yup.boolean().required(VALIDATION_MESSAGES.required),
});

type useAddMiembroProps = {
    consejo: IConsejo;
    callback: () => void;
    onResetAuxValues: () => void;
};

export function useAddMiembro({
    callback,
    consejo,
    onResetAuxValues,
}: useAddMiembroProps) {
    const { enqueueSnackbar } = useSnackbar();

    const { errorSummary, setErrorSummary, cleanErrorsSumary } =
        useErrorsResponse();

    const onSubmit = async (form: ConsejoMiembroForm) => {
        cleanErrorsSumary();

        const result = await saveMiembros(form);

        if (result.status === HTTP_STATUS.created) {
            enqueueSnackbar(result.message, { variant: "success" });
            // RESET
            onResetAuxValues();
            formik.resetForm();
            // CALLBACK
            callback();
        } else {
            enqueueSnackbar(result.message, { variant: "error" });
            setErrorSummary(result.errors);
        }
    };

    const formik = useFormik<ConsejoMiembroForm>({
        initialValues: {
            consejo: consejo.id,
            docente: -1,
            responsable: false,
        },
        onSubmit,
        validationSchema,
        enableReinitialize: true,
    });

    const handleReset = () => {
        onResetAuxValues();
        formik.resetForm();
    };

    return {
        formik,
        errorSummary,
        handleReset,
    };
}
