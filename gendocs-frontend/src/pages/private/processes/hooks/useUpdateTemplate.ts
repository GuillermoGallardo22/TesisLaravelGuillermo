import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getPlantillaById, updatePlantilla } from "services/plantillas";
import { IPlantilla } from "./useAddTemplates";

export const useUpdateTemplate = ({ templateId }: { templateId: number }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [template, setTemplate] = useState<IPlantilla>({
        id: -1,
        nombre: "",
        estado: false,
        proceso: -1,
    });

    useEffect(() => {
        getPlantillaById(templateId, { justForeignKey: true }).then(
            (result) => {
                if (result.status === HTTP_STATUS.ok) {
                    setTemplate(result.data);
                }
            }
        );
    }, []);

    const onSubmit = async (form: IPlantilla) => {
        const result = await updatePlantilla(form);

        if (result.status === HTTP_STATUS.ok) {
            setTemplate(result.data);
            enqueueSnackbar(result.message, { variant: "success" });
        } else {
            enqueueSnackbar(result.message, { variant: "error" });
        }

        formik.resetForm();
    };

    const formik = useFormik<IPlantilla>({
        enableReinitialize: true,
        initialValues: template,
        onSubmit,
    });

    return { formik };
};
