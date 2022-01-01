import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { IProceso } from "models/interfaces";
import { useSnackbar } from "notistack";
import { savePlantilla } from "services/plantillas";

export interface IPlantilla {
    id: number,
    nombre: string,
    estado: boolean,
    proceso: number | IProceso,
}

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
            proceso: processId
        },
    });

    return {
        formik,
    };
};
