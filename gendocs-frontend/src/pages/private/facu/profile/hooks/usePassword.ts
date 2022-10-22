import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IUpdatePasswordForm } from "models/interfaces/IUser";
import { useSnackbar } from "notistack";
import { updatePassword } from "services/auth";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const initialValues: IUpdatePasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .min(8, VALIDATION_MESSAGES.minLength(8))
    .max(20, VALIDATION_MESSAGES.maxLength(20)),
  newPassword: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .min(8, VALIDATION_MESSAGES.minLength(8))
    .max(20, VALIDATION_MESSAGES.maxLength(20)),
  confirmPassword: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .min(8, VALIDATION_MESSAGES.minLength(8))
    .max(20, VALIDATION_MESSAGES.maxLength(20))
    .oneOf(
      [yup.ref("newPassword"), null],
      VALIDATION_MESSAGES.passwordConfirmation
    ),
});

export default function usePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (form: IUpdatePasswordForm) => {
    const { status, message, errors } = await updatePassword(form);

    if (status === HTTP_STATUS.ok) {
      enqueueSnackbar(message, { variant: "success" });
    } else {
      enqueueSnackbar(errors?.length ? [errors] : message, {
        variant: "error",
      });
    }

    formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return { formik };
}
