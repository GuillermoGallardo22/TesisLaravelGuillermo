import SecurityIcon from "@mui/icons-material/Security";
import { Alert, AlertTitle } from "@mui/material";

const AccessDenied = () => {
    return (
        <Alert severity="error" icon={<SecurityIcon />}>
            <AlertTitle>Acceso denegado</AlertTitle>
            No tiene el rol requerido para acceder al recurso
        </Alert>
    );
};

export default AccessDenied;
