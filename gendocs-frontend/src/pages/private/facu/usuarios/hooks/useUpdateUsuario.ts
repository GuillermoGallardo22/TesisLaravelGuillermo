import { useFormik } from "formik";
import { useErrorsResponse } from "hooks";
import { HTTP_STATUS } from "models/enums";
import { IModule, IRole, IUser, IUserForm } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getModules, getRoles, getUserById, updateUser } from "services";
import { CONSTANTS, VALIDATION_MESSAGES } from "utils";
import * as yup from "yup";

const initialValues: IUserForm = {
  correo_principal: "",
  nombre: "",
  correo_secundario: "",
  id: -1,
  rol: -1,
  status: true,
  modulos: [],
};

type useUpdateUserProps = {
  userId: string;
};

export const useUpdateUsuario = ({ userId }: useUpdateUserProps) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(initialValues);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [modulos, setModulos] = useState<IModule[]>([]);

  const { errorSummary, setErrorSummary, cleanErrorsSumary } =
    useErrorsResponse();

  const { enqueueSnackbar } = useSnackbar();

  const handleSetUser = (user: IUser, roles: IRole[]) =>
    setUser({
      nombre: user.name,
      correo_principal: user.email,
      correo_secundario: user.email_gmail,
      status: user.status,
      id: user.id,
      rol: roles.find((i) => i.nombre === user.roles[0])?.id || -1,
      modulos: user.modulos.map((m) => m.id),
    });

  const loadInitData = useCallback(() => {
    if (!userId) navigate(-1);

    setLoading(true);
    Promise.all([getUserById(userId), getRoles(), getModules()])
      .then((r) => {
        const [userResult, _roles, _modulos] = r;

        if (userResult.status !== HTTP_STATUS.ok) {
          enqueueSnackbar(userResult.message, { variant: "warning" });
          navigate(-1);
        }

        handleSetUser(userResult.data, _roles);
        setRoles(_roles);
        setModulos(_modulos);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    loadInitData();
  }, [loadInitData]);

  const onSubmit = async (form: IUserForm): Promise<void> => {
    cleanErrorsSumary();

    const { status, message, errors, data } = await updateUser(form);

    if (status === HTTP_STATUS.ok) {
      handleSetUser(data, roles);
      enqueueSnackbar(message, { variant: "success" });
      formik.resetForm();
    } else {
      enqueueSnackbar(message, { variant: "error" });
      setErrorSummary(errors);
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
  });

  const formik = useFormik({
    onSubmit,
    validationSchema,
    initialValues: user,
    enableReinitialize: true,
  });

  const handleReset = () => {
    cleanErrorsSumary();
    formik.resetForm();
  };

  return {
    formik,
    errorsResponse: errorSummary,
    handleReset,
    roles,
    modulos,
    loading,
  };
};
