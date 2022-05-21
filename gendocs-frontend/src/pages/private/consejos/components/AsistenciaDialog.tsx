import { DialogContentText, List, ListItem, ListItemText } from "@mui/material";
import { ConfirmationDialog } from "components";
import { ConfirmationDialogReturnProps } from "hooks";
import { IMiembro } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { marcarAsistencia } from "services";
import { HTTP_MESSAGES } from "utils";

type AsistenciaDialog<T> = {
  miembros: IMiembro[];
} & Pick<ConfirmationDialogReturnProps<T>, "isVisible" | "closeModal">;

export function AsistenciaDialog<T>({
  miembros,
  isVisible,
  closeModal,
}: AsistenciaDialog<T>) {
  const [submitting, setSubmitting] = useState(false);
  const client = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const _marcarAsistencia = async () => {
    if (!miembros.length) return;

    setSubmitting(true);

    await Promise.all(miembros.map((m) => marcarAsistencia(m, true)));

    setSubmitting(false);
    closeModal();

    enqueueSnackbar(HTTP_MESSAGES[200], { variant: "success" });
    client.invalidateQueries(["consejos-miembros"]);
  };

  return (
    <ConfirmationDialog
      id="delete-miembro-modal"
      title="Asistencia"
      keepMounted={true}
      isVisible={isVisible}
      onCancel={closeModal}
      buttonColorCancel="error"
      onApprove={_marcarAsistencia}
      loading={submitting}
    >
      <DialogContentText>
        Se actualizará a un estado de <strong>asistido</strong> a los siguientes
        miembros:
      </DialogContentText>
      <List>
        {miembros.map((m, i) => (
          <ListItem key={i}>
            <ListItemText primary={m.docente.nombres} />
          </ListItem>
        ))}
      </List>
    </ConfirmationDialog>
  );
}
