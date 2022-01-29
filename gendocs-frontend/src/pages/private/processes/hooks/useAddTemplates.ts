import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { IPlantilla, IProceso } from "models/interfaces";
import { useSnackbar } from "notistack";
import { savePlantilla } from "services/plantillas";

export const useAddTemplates = ({ processId }: { processId: number }) => {

    const { enqueueSnackbar } = useSnackbar();

    const onSubmit = async (form: IPlantilla) => {
        const result = await savePlantilla(form);

        if (result.status === HTTP_STATUS.created) {
            enqueueSnackbar(result.message, { variant: "success" });
        } else {
            enqueueSnackbar(result.message, { variant: "error" });
        }

        formik.resetForm();
    };

    const formik = useFormik<IPlantilla>({
        onSubmit,
        initialValues: {
            id: -1,
            nombre: "",
            estado: true,
            proceso: processId,
            drive: ""
        },
    });

    return {
        formik,
    };
};
