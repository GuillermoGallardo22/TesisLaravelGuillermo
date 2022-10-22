import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ConfirmationDialog from "components/ConfirmationDialog";
import { NotificationEmailProps } from "models/interfaces/INotification";
import { formatRecipients } from "utils/libs";
import { useAsistenciaNotificacion } from "../hooks/useAsistenciaNotificacion";

export function NotificacionEmail<T>(props: NotificationEmailProps<T>) {
  const { miembros, closeModal, isVisible } = props;

  const { formik } = useAsistenciaNotificacion(props);

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
        id="miembro-notificacion-modal"
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
              multiline
              rows={3}
              margin="normal"
              label={`Destinatarios (${miembros.length})`}
              value={formatRecipients(
                miembros.map((m) => [m.docente.nombres, m.docente.correo_uta])
              )}
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
}
