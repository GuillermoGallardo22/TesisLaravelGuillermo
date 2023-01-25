import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ConfirmationDialog from "components/ConfirmationDialog";
import { useAuthContext } from "contexts/AuthContext";
import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IDocumento } from "models/interfaces/IDocumento";
import { NotificationEmailFormProps } from "models/interfaces/INotification";
import { IProceso } from "models/interfaces/IProceso";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { updateDocumento } from "services/documentos";
import { sendEmail } from "services/estudiantes";
import { getDefaultNotificationMessage } from "utils/libs";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

type NotificationEmailProps = {
  documento: null | IDocumento;
  isVisible: boolean;
  closeModal: () => void;
};

export const NotificationEmail: React.FunctionComponent<
  NotificationEmailProps
> = ({ documento, ...rest }) => {
  return documento ? (
    <NotificationEmailForm documento={documento} {...rest} />
  ) : (
    <></>
  );
};

type NotificationEmailFormPropsC = {
  documento: IDocumento;
} & Omit<NotificationEmailProps, "documento">;

const NotificationEmailForm: React.FunctionComponent<
  NotificationEmailFormPropsC
> = ({ isVisible, closeModal, documento }) => {
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (form: NotificationEmailFormProps) => {
    const result = await sendEmail(form.mensaje, documento.estudiante!);

    if (result.status === HTTP_STATUS.ok) {
      await updateDocumento(documento.id, { notificado_e: true });
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      const { errors, message } = result;

      enqueueSnackbar(errors?.length ? errors[0] : message, {
        variant: "error",
      });
    }

    closeModal();
  };

  const {
    context: { user },
  } = useAuthContext();

  const initialValues = useMemo(
    (): NotificationEmailFormProps => ({
      mensaje: getDefaultNotificationMessage(
        documento.plantilla.nombre,
        (documento.plantilla.proceso as IProceso).nombre,
        user.name
      ),
    }),
    [documento]
  );

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema: yup.object().shape({
      mensaje: yup
        .string()
        .required()
        .max(1024, VALIDATION_MESSAGES.maxLength(1024)),
    }),
  });

  const submitting = formik.isSubmitting;

  return (
    <Box
      id="notification-email-form"
      component="form"
      onSubmit={formik.handleSubmit}
      onReset={() => formik.resetForm()}
      noValidate
    >
      <ConfirmationDialog
        id="reset-password-modal"
        keepMounted={true}
        isVisible={isVisible}
        title="Notificación"
        onCancel={closeModal}
        textApprove="Enviar"
        buttonColorApprove="primary"
        buttonColorCancel="error"
        loading={submitting}
        onCancelButtonProps={{
          type: "reset",
        }}
        onApproveButtonProps={{
          type: "submit",
          form: "notification-email-form",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              margin="normal"
              label="Destinatario"
              value={`${[
                documento.estudiante?.nombres,
                documento.estudiante?.apellidos,
              ].join(" ")} <${documento.estudiante?.correo_uta}>`}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={submitting}
              multiline
              rows={10}
              margin="normal"
              id="mensaje"
              name="mensaje"
              label="Mensaje"
              autoComplete="off"
              value={formik.values.mensaje || ""}
              onChange={formik.handleChange}
              error={formik.touched.mensaje && Boolean(formik.errors.mensaje)}
              helperText={formik.touched.mensaje && formik.errors.mensaje}
            />
          </Grid>
        </Grid>
      </ConfirmationDialog>
    </Box>
  );
};
