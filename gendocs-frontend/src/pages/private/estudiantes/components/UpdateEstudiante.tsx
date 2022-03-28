import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField } from "@mui/material";
import { ErrorSummary, Select } from "components";
import { useParams } from "react-router-dom";
import { useUpdateEstudiante } from "../hooks/useUpdateEstudiante";

const UpdateEstudiante = () => {
    const { studentId = "" } = useParams<{ studentId: string }>();

    const { formik, carreras, submitting, errorSummary } = useUpdateEstudiante({
        studentId,
    });

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            noValidate
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Select
                        id="carrera"
                        name="carrera"
                        label="Carrera"
                        items={carreras.map((item) => ({
                            id: item.id,
                            label: item.nombre,
                        }))}
                        value={formik.values.carrera as number}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.carrera &&
                            Boolean(formik.errors.carrera)
                        }
                        errorMessage={
                            formik.touched.carrera && formik.errors.carrera
                        }
                    />
                </Grid>

                <Grid item xs={12}>
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
                        id="apellidos"
                        name="apellidos"
                        label="Apellidos"
                        value={formik.values.apellidos}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.apellidos &&
                            Boolean(formik.errors.apellidos)
                        }
                        helperText={
                            formik.touched.apellidos && formik.errors.apellidos
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

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="matricula"
                        name="matricula"
                        label="Matrícula"
                        value={formik.values.matricula}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.matricula &&
                            Boolean(formik.errors.matricula)
                        }
                        helperText={
                            formik.touched.matricula && formik.errors.matricula
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="folio"
                        name="folio"
                        label="Folio"
                        value={formik.values.folio}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.folio && Boolean(formik.errors.folio)
                        }
                        helperText={formik.touched.folio && formik.errors.folio}
                    />
                </Grid>

                {errorSummary && (
                    <Grid item xs={12}>
                        <ErrorSummary errors={errorSummary} />
                    </Grid>
                )}

                <Grid item xs={12}>
                    <LoadingButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={submitting}
                        loading={submitting}
                    >
                        Actualizar
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UpdateEstudiante;
