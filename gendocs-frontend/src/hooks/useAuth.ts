import { useAuthContext } from "contexts/AuthContext";
import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IUser } from "models/interfaces/IUser";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { AuthActionsEnum } from "reducers/AuthReducer";
import { login, logout as _logout } from "services/auth";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

interface IAuth {
  email: string;
  password: string;
}

const defaultFormValues: IAuth = {
  email: "gbarcia@uta.edu.ec",
  password: "12345678",
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(VALIDATION_MESSAGES.invalidFormat)
    .max(100, VALIDATION_MESSAGES.maxLength(100))
    .required(VALIDATION_MESSAGES.required),
  password: yup
    .string()
    .max(100, VALIDATION_MESSAGES.maxLength(100))
    .required(VALIDATION_MESSAGES.required),
});

export const useAuth = () => {
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  const onSubmit = async (form: IAuth) => {
    const { status, message, data } = await login(form.email, form.password);

    if (status === HTTP_STATUS.ok) {
      dispatch({
        type: AuthActionsEnum.setUser,
        payload: data,
      });
      dispatch({ type: AuthActionsEnum.setIsAuth, payload: true });
    } else {
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const logout = async () => {
    dispatch({ type: AuthActionsEnum.setCheckingAuth, payload: true });

    await _logout();

    navigate("/login", { replace: true });

    dispatch({ type: AuthActionsEnum.setIsAuth, payload: false });
    dispatch({ type: AuthActionsEnum.setUser, payload: {} as IUser });
    dispatch({ type: AuthActionsEnum.setCheckingAuth, payload: false });
  };

  const formik = useFormik<IAuth>({
    initialValues: defaultFormValues,
    onSubmit,
    validationSchema,
  });

  return {
    formik,
    logout,
  };
};
