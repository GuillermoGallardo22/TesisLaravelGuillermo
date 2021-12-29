import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { useEffect, useState } from "react";
import { getPlantillaById, updatePlantilla } from "services/plantillas";
import { IPlantilla } from "./useAddTemplates";

export const useUpdateTemplate = ({ templateId }: { templateId: number }) => {

    const [template, setTemplate] = useState<IPlantilla>({ id: -1, nombre: "", estado: false, proceso: -1 });

    useEffect(() => {
        getPlantillaById(templateId).then(result => {
            if (result.status === HTTP_STATUS.ok) {
                setTemplate({
                    ...result.data,
                    proceso: typeof result.data.proceso === "number" ? result.data.proceso : result.data.proceso.id,
                });
            }
        });
    }, []);

    const onSubmit = async (form: IPlantilla) => {
        await updatePlantilla(form);
    };

    const formik = useFormik<IPlantilla>({
        enableReinitialize: true,
        initialValues: template,
        onSubmit
    });

    return { formik };
};
