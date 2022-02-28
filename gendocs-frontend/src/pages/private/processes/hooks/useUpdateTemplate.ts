import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { IPlantilla, IProceso } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlantillaById, updatePlantilla } from "services/plantillas";
import { getProcesos } from "services/proceso";

export const useUpdateTemplate = ({ templateId }: { templateId: number }) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [template, setTemplate] = useState<IPlantilla>({
        id: -1,
        nombre: "",
        estado: false,
        proceso: -1,
        drive: "",
    });

    const [loading, setLoading] = useState(true);
    const [procesos, setProcesos] = useState<IProceso[]>([]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getProcesos({ filters: { estado: 1 } }),
            getPlantillaById(templateId, { justForeignKey: true }),
        ])
            .then((result) => {
                const [_procesoResult, _plantillaResult] = result;

                if (_plantillaResult.status !== HTTP_STATUS.ok) {
                    setLoading(false);
                    enqueueSnackbar(_plantillaResult.message, {
                        variant: "warning",
                    });
                    navigate(-1);
                }

                const _plantilla = _plantillaResult.data;

                setTemplate(_plantilla);
                setProcesos(_procesoResult.data);
            })
            .finally(() => setLoading(false));
    }, []);

    const onSubmit = async (form: IPlantilla) => {
        const result = await updatePlantilla(form);

        if (result.status === HTTP_STATUS.ok) {
            enqueueSnackbar(result.message, { variant: "success" });
            if (template.proceso !== form.proceso) {
                navigate(-1);
            } else {
                setTemplate(result.data);
            }
        } else {
            enqueueSnackbar(result.message, { variant: "error" });
        }
    };

    const formik = useFormik<IPlantilla>({
        enableReinitialize: true,
        initialValues: template,
        onSubmit,
    });

    return { formik, procesos, loading };
};
