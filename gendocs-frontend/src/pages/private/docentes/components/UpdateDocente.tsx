import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ErrorSummary } from "components";
import { useUpdateDocente } from "../hooks/usUpdateDocente";

const UpdateDocente = () => {
    const { formik, errorSummary } = useUpdateDocente();

    const submitting = formik.isSubmitting;

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            noValidate
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="cedula"
                        name="cedula"
                        label="Cédula"
                        value={formik.values.cedula}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.cedula &&
                            Boolean(formik.errors.cedula)
                        }
                        helperText={
                            formik.touched.cedula && formik.errors.cedula
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="nombres"
                        name="nombres"
                        label="Nombres"
                        value={formik.values.nombres}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.nombres &&
                            Boolean(formik.errors.nombres)
                        }
                        helperText={
                            formik.touched.nombres && formik.errors.nombres
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="celular"
                        name="celular"
                        label="Celular"
                        placeholder="0987654321"
                        value={formik.values.celular}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.celular &&
                            Boolean(formik.errors.celular)
                        }
                        helperText={
                            formik.touched.celular && formik.errors.celular
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="telefono"
                        name="telefono"
                        label="Teléfono"
                        value={formik.values.telefono}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.telefono &&
                            Boolean(formik.errors.telefono)
                        }
                        helperText={
                            formik.touched.telefono && formik.errors.telefono
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="correo_uta"
                        name="correo_uta"
                        label="Correo UTA"
                        autoComplete="correo_uta"
                        value={formik.values.correo_uta}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.correo_uta &&
                            Boolean(formik.errors.correo_uta)
                        }
                        helperText={
                            formik.touched.correo_uta &&
                            formik.errors.correo_uta
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="correo"
                        name="correo"
                        label="Correo"
                        autoComplete="correo"
                        value={formik.values.correo}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.correo &&
                            Boolean(formik.errors.correo)
                        }
                        helperText={
                            formik.touched.correo && formik.errors.correo
                        }
                    />
                </Grid>

                {errorSummary && <ErrorSummary errors={errorSummary} />}

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

export default UpdateDocente;
