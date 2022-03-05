import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums";
import { IConsejo, IConsejoForm, ITipoConsejo } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getConsejo, updateConsejo } from "services/consejos";
import { getTipoConsejos } from "services/tipo-consejos";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const initialValues: IConsejoForm = {
    id: -1,
    tipo_consejo: -1,
    nombre: "",
    fecha: new Date(),
};

type useUpdateConsejoProps = {
    consejoId: string;
};

export function useUpdateConsejo({ consejoId }: useUpdateConsejoProps) {
    const navigate = useNavigate();
    const [consejo, setConsejo] = useState(initialValues);
    const [tipoConsejos, setTipoConsejos] = useState<ITipoConsejo[]>([]);
    const [loading, setLoading] = useState(true);
    const { errorSummary, setErrorSummary, cleanErrorsSumary } =
        useErrorsResponse();

    const { enqueueSnackbar } = useSnackbar();

    const parseConsejo = (data: IConsejo) => {
        const { id, nombre, fecha, tipo_consejo } = data;

        setConsejo({
            id: id,
            nombre,
            fecha: new Date(fecha),
            tipo_consejo: (tipo_consejo as ITipoConsejo).id,
        });
    };

    const loadInitData = useCallback(() => {
        setLoading(true);
        Promise.all([getTipoConsejos(), getConsejo(consejoId)])
            .then((result) => {
                const [_tipoConsejos, _consejo] = result;

                if (_consejo.status !== HTTP_STATUS.ok) {
                    enqueueSnackbar(_consejo.message, { variant: "warning" });
                    navigate(-1);
                    return;
                }

                parseConsejo(_consejo.data);
                setTipoConsejos(_tipoConsejos);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        loadInitData();
    }, [loadInitData]);

    const onSubmit = async (form: IConsejoForm) => {
        cleanErrorsSumary();

        const result = await updateConsejo(form);

        if (result.status === HTTP_STATUS.ok) {
            enqueueSnackbar(result.message, { variant: "success" });
            parseConsejo(result.data);
        } else {
            enqueueSnackbar(result.message, { variant: "error" });
            setErrorSummary(result.errors);
        }
    };

    const validationSchema = yup.object().shape({
        tipo_consejo: yup
            .mixed()
            .oneOf(
                tipoConsejos.map((i) => i.id),
                VALIDATION_MESSAGES.invalidOption
            )
            .required(VALIDATION_MESSAGES.required),
        nombre: yup
            .string()
            .required(VALIDATION_MESSAGES.required)
            .max(255, VALIDATION_MESSAGES.maxLength(255)),
        fecha: yup
            .date()
            .required(VALIDATION_MESSAGES.required)
            .typeError(VALIDATION_MESSAGES.invalidDate),
    });

    const formik = useFormik<IConsejoForm>({
        onSubmit,
        initialValues: consejo,
        validationSchema,
        enableReinitialize: true,
    });

    return {
        formik,
        tipoConsejos,
        loading,
        errorSummary,
    };
}
