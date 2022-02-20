import SecurityIcon from "@mui/icons-material/Security";
import { Alert, AlertTitle, Paper, Stack } from "@mui/material";

const AccessDenied = () => {
    return (
        <Paper sx={{ p: 2 }}>
            <Stack gap={2}>
                <Alert severity="error" icon={<SecurityIcon />}>
                    <AlertTitle>Acceso denegado</AlertTitle>
                    No tiene el rol requerido para acceder al recurso
                </Alert>
            </Stack>
        </Paper>
    );
};

export default AccessDenied;
