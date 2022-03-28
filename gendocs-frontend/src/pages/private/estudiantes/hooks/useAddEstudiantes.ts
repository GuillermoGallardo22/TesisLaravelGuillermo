import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { ICarrera } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { getAllCarreras, saveListEstudiante } from "services";
import { CONSTANTS, unique, VALIDATION_MESSAGES } from "utils";
import * as yup from "yup";

export interface MultipleStudentForm {
  id: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  celular: string;
  correo: string;
  correo_uta: string;
  matricula: string;
  folio: string;
}

yup.addMethod(yup.array, "unique", unique);

export interface BaseMultipleStudentForm {
  carrera: number;
  estudiantes: MultipleStudentForm[];
}

export const useAddEstudiantes = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [carreras, setCarreras] = useState<ICarrera[]>([]);

  const validationSchema = yup.object().shape({
    carrera: yup
      .mixed()
      .oneOf(
        carreras.map((item) => item.id),
        VALIDATION_MESSAGES.invalidOption
      )
      .required(VALIDATION_MESSAGES.required),
    estudiantes: yup
      .array()
      .of(
        yup.object().shape({
          cedula: yup
            .string()
            .required(VALIDATION_MESSAGES.required)
            .max(10, VALIDATION_MESSAGES.maxLength(10)),
          nombres: yup
            .string()
            .required(VALIDATION_MESSAGES.required)
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
          apellidos: yup
            .string()
            .required(VALIDATION_MESSAGES.required)
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
          celular: yup
            .string()
            .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
            .max(10, VALIDATION_MESSAGES.maxLength(10)),
          telefono: yup
            .string()
            .matches(CONSTANTS.phone_regex, VALIDATION_MESSAGES.invalidFormat)
            .max(10, VALIDATION_MESSAGES.maxLength(10)),
          correo: yup
            .string()
            // .email(VALIDATION_MESSAGES.invalidFormat)
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
          correo_uta: yup
            .string()
            .matches(
              CONSTANTS.email_uta_regex,
              VALIDATION_MESSAGES.invalidFormat
            )
            .max(100, VALIDATION_MESSAGES.maxLength(100)),
          matricula: yup.string().max(10, VALIDATION_MESSAGES.maxLength(10)),
          folio: yup.string().max(10, VALIDATION_MESSAGES.maxLength(10)),
        })
      )
      .unique(VALIDATION_MESSAGES.ciDuplicated, (a: any) => a.cedula)
      .min(1, VALIDATION_MESSAGES.required),
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (form: BaseMultipleStudentForm) => {
    setSubmitting(true);

    const result = await saveListEstudiante(form);

    if (result.status === HTTP_STATUS.created) {
      formik.resetForm();
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }

    setSubmitting(false);
  };

  const formik = useFormik<BaseMultipleStudentForm>({
    initialValues: {
      carrera: -1,
      estudiantes: [],
    },
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    Promise.all([getAllCarreras({ filters: { estado: 1 } })]).then(
      (results) => {
        const [_carreras] = results;
        setCarreras(_carreras);
      }
    );
  }, []);

  return {
    formik,
    carreras,
    submitting,
  };
};
