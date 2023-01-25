import { useModuleContext } from "contexts/ModuleContext";
import { FormikHelpers, useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { useConsejos } from "hooks/useQuery";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IReservaForm } from "models/interfaces/INumeracion";
import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { createReserva, getNumeracion } from "services/numeracion";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

export function useAddReserva() {
  const { module } = useModuleContext();
  const { enqueueSnackbar } = useSnackbar();
  const { errorSummary, setErrorSummary } = useErrorsResponse();

  const initialValues: IReservaForm = {
    desde: -1,
    hasta: -1,
    consejo: -1,
    module,
  };

  const { data: consejos = [], isLoading: isLoadingC } = useConsejos({
    filters: {
      module,
    },
  });

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
      .test("isMoreOrEqualsThan", VALIDATION_MESSAGES.invalidOption, (v, c) => {
        if (!v || !c.parent.desde) return false;

        return v >= c.parent.desde;
      }),
    consejo: yup.number().oneOf(
      consejos.map((i) => i.id),
      VALIDATION_MESSAGES.invalidOption
    ),
  });

  const onSubmit = async (
    form: IReservaForm,
    helpers: FormikHelpers<IReservaForm>
  ) => {
    setErrorSummary(undefined);

    const result = await createReserva(form);

    if (result.status === HTTP_STATUS.created) {
      enqueueSnackbar(result.message, { variant: "success" });
      helpers.resetForm();
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
    () =>
      getNumeracion({
        filters: {
          module,
        },
      }),
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
