import { Alert, AlertTitle } from "@mui/material";
import Icon from "./Icon";

const AccessDenied = () => {
    return (
        <Alert severity="error" icon={<Icon icon="security" />}>
            <AlertTitle>Acceso denegado</AlertTitle>
            No tiene el rol requerido para acceder al recurso
        </Alert>
    );
};

export default AccessDenied;
