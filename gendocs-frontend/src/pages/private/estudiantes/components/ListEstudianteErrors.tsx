import { Grid, Alert, AlertTitle } from "@mui/material";

interface ListStudentsErrorsProps {
    errors: any;
}

const ListStudentsErrors: React.FC<ListStudentsErrorsProps> = ({ errors }) => {
    return (
        <Grid item xs={12}>
            <Alert severity="error">
                <AlertTitle>Información no válida</AlertTitle>

                {typeof errors === "string" ? (
                    <p>{errors}</p>
                ) : (
                    <>
                        <p>
                            Verifique los errores en las siguientes filas del
                            documento.
                        </p>

                        {errors.map(
                            (item: any, index: number) =>
                                item && (
                                    <pre key={index}>
                                        {JSON.stringify(
                                            {
                                                fila: index + 2,
                                                errores: item,
                                            },
                                            null,
                                            2
                                        )}
                                    </pre>
                                )
                        )}
                    </>
                )}
            </Alert>
        </Grid>
    );
};

export default ListStudentsErrors;
