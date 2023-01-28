import { useFormik } from "formik";
import { useState } from "react";
import { generarReporteProcesoPlantillas } from "services/proceso";
import { getFirstMonthDate } from "utils/date";
import { VALIDATION_MESSAGES as VM } from "utils/messages";
import * as yup from "yup";

export interface IProcesosPlantillasReporte {
  id: number;
  nombre: string;
  total: number;
}

interface IProcesosPlantillasReporteForm {
  module: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  proceso: number;
}

const NOW = new Date();

const validationSchema = yup.object().shape({
  module: yup.string().required(VM.required),
  fecha_inicio: yup.date().required(VM.required).typeError(VM.invalidDate),
  fecha_fin: yup.date().required(VM.required).typeError(VM.invalidDate),
  proceso: yup.number().min(1, VM.invalidOption),
});

export function useProcesosPlantillasReporte(module: string) {
  const [result, setResult] = useState<Array<IProcesosPlantillasReporte>>([]);

  const onSubmit = async (form: IProcesosPlantillasReporteForm) => {
    const { data } = await generarReporteProcesoPlantillas({
      queryParams: {
        modulo: form.module,
        proceso: form.proceso,
        fi: form.fecha_inicio.toISOString(),
        ff: form.fecha_fin.toISOString(),
      },
    });

    setResult(data);
  };

  const formik = useFormik<IProcesosPlantillasReporteForm>({
    onSubmit,
    initialValues: {
      fecha_inicio: getFirstMonthDate(NOW),
      fecha_fin: NOW,
      proceso: -1,
      module,
    },
    validationSchema,
  });

  const handleReset = () => {
    formik.resetForm();
    setResult([]);
  };

  return { formik, result, handleReset };
}
