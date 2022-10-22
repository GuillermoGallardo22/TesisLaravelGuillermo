import { useModuleContext } from "contexts/ModuleContext";
import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IConsejoForm } from "models/interfaces/IConsejo";
import { ITipoConsejo } from "models/interfaces/ITipoConsejo";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { saveConsejo } from "services/consejos";
import { getTipoConsejos } from "services/tipo-consejos";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

export function useAddConsejo() {
  const [tipoConsejos, setTipoConsejos] = useState<ITipoConsejo[]>([]);
  const [loading, setLoading] = useState(true);
  const { errorSummary, setErrorSummary, cleanErrorsSumary } =
    useErrorsResponse();
  const { enqueueSnackbar } = useSnackbar();
  const { module } = useModuleContext();

  const initialValues = useMemo(
    (): IConsejoForm => ({
      id: -1,
      tipo_consejo: -1,
      nombre: "",
      fecha: new Date(),
      module,
    }),
    []
  );

  const loadInitData = useCallback(() => {
    setLoading(true);
    Promise.all([getTipoConsejos()])
      .then((result) => {
        const [_tipoConsejos] = result;
        setTipoConsejos(_tipoConsejos);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadInitData();
  }, [loadInitData]);

  const onSubmit = async (form: IConsejoForm) => {
    cleanErrorsSumary();

    const result = await saveConsejo(form);

    if (result.status === HTTP_STATUS.created) {
      formik.resetForm();
      enqueueSnackbar(result.message, { variant: "success" });
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
    initialValues,
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
