import { Alert, AlertTitle, Grid } from "@mui/material";
import React from "react";

interface ErrorSummaryProps {
    errors: string | string[] | undefined | null;
}

const ErrorSummary: React.FC<ErrorSummaryProps> = ({ errors }) => {
    return !errors ? (
        <></>
    ) : (
        <Grid item xs={12}>
            <Alert severity="error">
                <AlertTitle>
                    Por favor solucione los siguientes errores (
                    {typeof errors === "string" ? 1 : errors.length})
                </AlertTitle>

                {typeof errors === "string"
                    ? errors
                    : errors.map((error, index) => <p key={index}>{error}</p>)}
            </Alert>
        </Grid>
    );
};

export default ErrorSummary;
