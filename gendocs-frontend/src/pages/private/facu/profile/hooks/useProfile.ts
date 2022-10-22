import { useAuthContext } from "contexts/AuthContext";
import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IUser } from "models/interfaces/IUser";
import { useSnackbar } from "notistack";
import { AuthActionsEnum } from "reducers/AuthReducer";
import { updateProfile } from "services/auth";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .min(4, VALIDATION_MESSAGES.maxLength(4))
    .max(255, VALIDATION_MESSAGES.maxLength(255)),
});

export default function useProfile() {
  const {
    context: { user },
    dispatch,
  } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (form: IUser) => {
    const { status, message, data } = await updateProfile(form);

    if (status === HTTP_STATUS.ok) {
      enqueueSnackbar(message, { variant: "success" });
      dispatch({
        type: AuthActionsEnum.setUser,
        payload: data,
      });
    } else {
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  const formik = useFormik<IUser>({
    initialValues: user,
    onSubmit,
    validationSchema,
  });

  return { formik };
}
