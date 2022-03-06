import { LoadingButton } from "@mui/lab";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";

type ButtonColor =
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";

type ConfirmationDialogProps = {
    id: string;
    isVisible: boolean;
    onCancel: React.MouseEventHandler<HTMLButtonElement>;
    onApprove: React.MouseEventHandler<HTMLButtonElement>;
    title: React.ReactNode;
    keepMounted?: boolean;
    loading?: boolean;
    textCancel?: string;
    textApprove?: string;
    buttonColorCancel?: ButtonColor;
    buttonColorApprove?: ButtonColor;
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
    children,
}) => {
    return (
        <Dialog
            id={id}
            sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
            maxWidth="sm"
            open={isVisible}
            keepMounted={keepMounted}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
            <DialogActions>
                <LoadingButton
                    onClick={onCancel}
                    color={buttonColorCancel}
                    disabled={loading}
                >
                    {textCancel}
                </LoadingButton>

                <LoadingButton
                    onClick={onApprove}
                    color={buttonColorApprove}
                    disabled={loading}
                    loading={loading}
                >
                    {textApprove}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
