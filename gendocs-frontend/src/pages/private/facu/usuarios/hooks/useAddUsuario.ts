import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IModule } from "models/interfaces/IModule";
import { IRole } from "models/interfaces/IRole";
import { IUserForm } from "models/interfaces/IUser";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { getRoles, getModules, createUser } from "services/auth";
import { CONSTANTS } from "utils/constants";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const initialValues: IUserForm = {
  correo_principal: "",
  nombre: "",
  correo_secundario: "",
  id: -1,
  rol: -1,
  modulos: [],
};

export const useAddUsuario = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [modulos, setModulos] = useState<IModule[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState<string[] | undefined>();

  const loadInitData = useCallback(() => {
    Promise.all([getRoles(), getModules()]).then((result) => {
      const [_roles, _modules] = result;
      setRoles(_roles);
      setModulos(_modules);
    });
  }, []);

  useEffect(() => {
    loadInitData();
  }, []);

  const onSubmit = async (form: IUserForm): Promise<void> => {
    setErrors(undefined);

    const { status, message, errors } = await createUser(form);

    if (status === HTTP_STATUS.created) {
      enqueueSnackbar(message, { variant: "success" });
      formik.resetForm();
    } else {
      enqueueSnackbar(message, { variant: "error" });
      setErrors(errors);
    }
  };

  const validationSchema = yup.object().shape({
    nombre: yup
      .string()
      .required(VALIDATION_MESSAGES.required)
      .max(255, VALIDATION_MESSAGES.maxLength(255)),
    correo_principal: yup
      .string()
      .matches(CONSTANTS.EMAIL_UTA_REGEX, VALIDATION_MESSAGES.invalidFormat)
      .required(VALIDATION_MESSAGES.required)
      .max(255, VALIDATION_MESSAGES.maxLength(255)),
    correo_secundario: yup
      .string()
      .matches(CONSTANTS.EMAIL_GMAIL_REGEX, VALIDATION_MESSAGES.invalidFormat)
      .required(VALIDATION_MESSAGES.required)
      .max(255, VALIDATION_MESSAGES.maxLength(255)),
    rol: yup
      .mixed()
      .oneOf(
        roles.map((item) => item.id),
        VALIDATION_MESSAGES.invalidOption
      )
      .required(VALIDATION_MESSAGES.required),
    modulos: yup
      .array()
      .test("invalid-option", VALIDATION_MESSAGES.invalidOption, (op = []) => {
        const result = Boolean(
          op.length && op.every((m) => modulos.map((i) => i.id).includes(m))
        );
        return result;
      }),
  });

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema,
    enableReinitialize: true,
  });

  const handleReset = () => {
    setErrors(undefined);
    formik.resetForm();
  };

  return {
    formik,
    errorsResponse: errors,
    handleReset,
    roles,
    modulos,
  };
};
