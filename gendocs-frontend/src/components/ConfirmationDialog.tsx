import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Breakpoint } from "@mui/material/styles";

type ButtonColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

export type ConfirmationDialogProps = {
  id: string;
  isVisible: boolean;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onApprove?: React.MouseEventHandler<HTMLButtonElement>;
  title: React.ReactNode;
  keepMounted?: boolean;
  loading?: boolean;
  textCancel?: string;
  textApprove?: string;
  buttonColorCancel?: ButtonColor;
  buttonColorApprove?: ButtonColor;
  width?: string;
  maxHeight?: string;
  maxWidth?: Breakpoint;
  onCancelButtonProps?: LoadingButtonProps;
  onApproveButtonProps?: LoadingButtonProps;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  id,
  isVisible,
  onCancel,
  onApprove,
  title,
  keepMounted,
  loading,
  textCancel = "Cancelar",
  textApprove = "Aceptar",
  buttonColorCancel = "primary",
  buttonColorApprove = "primary",
  width = "80%",
  maxHeight = "80%",
  maxWidth = "sm",
  children,
  onCancelButtonProps,
  onApproveButtonProps,
}) => {
  return (
    <Dialog
      id={id}
      sx={{ "& .MuiDialog-paper": { width, maxHeight } }}
      maxWidth={maxWidth}
      open={isVisible}
      scroll="paper"
      keepMounted={keepMounted}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions>
        <LoadingButton
          onClick={onCancel}
          color={buttonColorCancel}
          disabled={loading}
          {...onCancelButtonProps}
        >
          {textCancel}
        </LoadingButton>

        <LoadingButton
          onClick={onApprove}
          color={buttonColorApprove}
          disabled={loading}
          loading={loading}
          {...onApproveButtonProps}
        >
          {textApprove}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
