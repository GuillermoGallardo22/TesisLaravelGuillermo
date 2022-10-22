import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { ICarrera } from "models/interfaces/ICarrera";
import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getCarrera, updateCarrera } from "services/carreras";
import { initialValues, validationSchema } from "./useAddCarrera";

export const useUpdateCarrera = () => {
  const navigate = useNavigate();
  const { carreraId = "" } = useParams<{ carreraId: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const { errorSummary, setErrorSummary } = useErrorsResponse();

  const {
    data: carrera,
    isLoading: gettingCarrera,
    refetch,
  } = useQuery(["carrera"], () => getCarrera(carreraId), {
    onSuccess: (r) => {
      if (r.status !== HTTP_STATUS.ok) {
        enqueueSnackbar(r.message, { variant: "warning" });
        navigate(-1);
      }
    },
  });

  const onSubmit = async (form: ICarrera) => {
    setErrorSummary(undefined);

    const result = await updateCarrera(form);

    if (result.status === HTTP_STATUS.created) {
      enqueueSnackbar(result.message, { variant: "success" });
      refetch();
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setErrorSummary(result.errors);
    }
  };

  const formik = useFormik({
    initialValues: carrera?.data || initialValues,
    onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  const handleReset = () => {
    setErrorSummary(undefined);
    formik.resetForm();
  };

  return {
    formik,
    errorSummary,
    handleReset,
    gettingCarrera,
  };
};
