import DialogContentText from "@mui/material/DialogContentText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ConfirmationDialog from "components/ConfirmationDialog";
import { ConfirmationDialogReturnProps } from "hooks/useConfirmationDialog";
import { IDocente } from "models/interfaces/IDocente";
import { IResponse } from "models/interfaces/IResponse";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { HTTP_MESSAGES } from "utils/messages";

type AsistenciaDialog<T> = {
  miembros: T[];
  onSummit: (miembro: T, asistio: boolean) => Promise<IResponse<T>>;
  queryKey: string[];
  nameKey: keyof T;
} & Pick<ConfirmationDialogReturnProps<T>, "isVisible" | "closeModal">;

export function AsistenciaDialog<T>({
  miembros,
  isVisible,
  closeModal,
  queryKey,
  onSummit,
  nameKey,
}: AsistenciaDialog<T>) {
  const [submitting, setSubmitting] = useState(false);
  const client = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const _marcarAsistencia = async () => {
    if (!miembros.length) return;

    setSubmitting(true);

    await Promise.all(miembros.map((m) => onSummit(m, true)));
    client.invalidateQueries(queryKey);

    setSubmitting(false);
    closeModal();

    enqueueSnackbar(HTTP_MESSAGES[200], { variant: "success" });
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
        docentes:
      </DialogContentText>
      <List>
        {miembros.map((m, i) => (
          <ListItem key={i}>
            <ListItemText primary={(m[nameKey] as IDocente).nombres} />
          </ListItem>
        ))}
      </List>
    </ConfirmationDialog>
  );
}
