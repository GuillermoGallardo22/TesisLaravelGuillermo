import { LoadingButton } from "@mui/lab";
import {
    Box,
    FormControlLabel,
    FormLabel,
    Grid,
    Switch,
    TextField,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { useAddPlantilla } from "../hooks/useAddPlantilla";

const AddPlantilla = () => {
    const { processId = "" } = useParams<{ processId: string }>();

    const { formik } = useAddPlantilla({ processId: +processId });

    const submitting = formik.isSubmitting;

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            noValidate
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.nombre &&
                            Boolean(formik.errors.nombre)
                        }
                        helperText={
                            formik.touched.nombre && formik.errors.nombre
                        }
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormLabel component="legend">Estado</FormLabel>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={formik.values.estado}
                                onChange={(e) =>
                                    formik.setFieldValue(
                                        "estado",
                                        e.target.checked
                                    )
                                }
                            />
                        }
                        label={
                            formik.values.estado ? "Activado" : "Desactivado"
                        }
                        labelPlacement="start"
                    />
                </Grid>

                {/* <Grid item xs={12}>
                    <ErrorSummary errors={errorSummary} />
                </Grid> */}

                <Grid item xs={12} sm={6}>
                    <LoadingButton
                        fullWidth
                        type="reset"
                        color="warning"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={submitting}
                    >
                        Limpiar
                    </LoadingButton>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={submitting}
                        loading={submitting}
                    >
                        Guardar
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddPlantilla;
