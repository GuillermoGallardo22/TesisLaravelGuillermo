import { useAuthContext } from "contexts/AuthContext";
import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IMiembro } from "models/interfaces/IConsejoMiembro";
import {
  NotificationEmailFormProps,
  NotificationEmailProps,
} from "models/interfaces/INotification";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { useQueryClient } from "react-query";
import { sendNotification } from "services/miembros";
import {
  formatRecipients,
  getDefaultNotificationMessageAsistencia,
} from "utils/libs";
import { CUSTOM_HTTP_MESSAGES, VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

export function useAsistenciaNotificacion<T>({
  closeModal,
  consejo,
  miembros,
}: NotificationEmailProps<T>) {
  const {
    context: { user },
  } = useAuthContext();

  const client = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (form: NotificationEmailFormProps) => {
    if (!miembros.length) return;

    const correctamente: IMiembro[] = [];
    const incorrectamente: IMiembro[] = [];

    for (let i = 0; i < miembros.length; i++) {
      const miembro = miembros[i];

      const result = await sendNotification({
        mensaje: form.mensaje,
        miembro: miembro.id,
      });

      if (result.status === HTTP_STATUS.ok) {
        correctamente.push(miembro);
      } else {
        incorrectamente.push(miembro);
      }
    }

    if (correctamente.length) {
      enqueueSnackbar(
        CUSTOM_HTTP_MESSAGES.NOTI_EMAI_SEND_SUCC(correctamente.length),
        {
          variant: "success",
        }
      );
    }

    if (incorrectamente.length) {
      enqueueSnackbar(
        CUSTOM_HTTP_MESSAGES.NOTI_EMAI_SEND_FAIL(
          incorrectamente.length,
          formatRecipients(
            incorrectamente.map((m) => [
              m.docente.nombres,
              m.docente.correo_uta,
            ])
          )
        ),
        {
          variant: "error",
        }
      );
    }

    closeModal();
    client.invalidateQueries(["consejos-miembros"]);
  };

  const initialValues = useMemo(
    (): NotificationEmailFormProps => ({
      mensaje: getDefaultNotificationMessageAsistencia(consejo, user.name),
    }),
    [consejo, miembros]
  );

  const formik = useFormik<NotificationEmailFormProps>({
    onSubmit,
    initialValues,
    validationSchema: yup.object().shape({
      mensaje: yup
        .string()
        .required()
        .max(1024, VALIDATION_MESSAGES.maxLength(1024)),
    }),
  });

  return {
    formik,
  };
}
