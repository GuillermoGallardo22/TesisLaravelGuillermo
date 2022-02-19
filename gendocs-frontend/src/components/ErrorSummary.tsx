import { Alert, Grid } from "@mui/material";
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
                {typeof errors === "string"
                    ? errors
                    : errors.map((error, index) => <p key={index}>{error}</p>)}
            </Alert>
        </Grid>
    );
};

export default ErrorSummary;
