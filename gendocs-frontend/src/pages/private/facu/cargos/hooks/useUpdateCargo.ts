import { useFormik } from "formik";
import { useErrorsResponse } from "hooks";
import { HTTP_STATUS } from "models/enums";
import { ICargo, IDocente, IUpdateCargo } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getCargo, updateCargo } from "services";
import { validationSchema } from "./useAddCargo";

type useUpdateCargoProps = {
  cargoId: string;
  setInitDocenteValue: (docente: IDocente) => void;
  resetForm: () => void;
};

const initialValues: IUpdateCargo = {
  docente: -1,
  nombre: "",
  variable: "",
};

export const useUpdateCargo = ({
  cargoId,
  setInitDocenteValue,
  resetForm,
}: useUpdateCargoProps) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { errorSummary, setErrorSummary, cleanErrorsSumary } =
    useErrorsResponse();

  const [data, setData] = useState<ICargo | null>(null);

  useEffect(() => {
    if (!cargoId) return;

    (async () => {
      const r = await getCargo(cargoId);

      if (r.status !== HTTP_STATUS.ok) {
        navigate(-1);
        return;
      }

      setData(r.data);
    })();
  }, []);

  useEffect(() => {
    const cargo = data;
    if (!cargo) return;

    setInitDocenteValue(cargo.docente);

    formik.setFieldValue("nombre", cargo.nombre);
    formik.setFieldValue("variable", cargo.variable);
    formik.setFieldValue("docente", cargo.docente.id);
  }, [data?.id]);

  const onSubmit = async (form: IUpdateCargo) => {
    cleanErrorsSumary();

    const result = await updateCargo(cargoId, form);

    if (result.status === HTTP_STATUS.ok) {
      enqueueSnackbar(result.message, { variant: "success" });
      // RESET
      // resetForm();
      // formik.resetForm();
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setErrorSummary(result.errors);
    }
  };

  const formik = useFormik({ onSubmit, initialValues });

  return {
    formik,
    errorSummary,
    validationSchema,
  };
};
