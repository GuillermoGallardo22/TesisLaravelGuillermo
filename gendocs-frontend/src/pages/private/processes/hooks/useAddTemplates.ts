import { useFormik } from "formik";
import { IProceso } from "models/interfaces";
import { savePlantilla } from "services/plantillas";

export interface IPlantilla {
    id: number,
    nombre: string,
    estado: boolean,
    proceso: number | IProceso,
}

export const useAddTemplates = ({ processId }: { processId: number }) => {

    const onSubmit = async (form: IPlantilla) => {
        await savePlantilla(form);
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
