import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField } from "@mui/material";
import ErrorSummary from "components/ErrorSummary";
import Select from "components/Select";
import { useParams } from "react-router-dom";
import { useUpdateUser } from "../hooks/useUpdateUser";

const UpdateUser = () => {
    const { userId = "" } = useParams<{ userId: string }>();
    const { formik, handleReset, errorsResponse, roles, loading } =
        useUpdateUser({
            userId,
        });

    const submitting = formik.isSubmitting || loading;

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            onReset={handleReset}
            noValidate
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Select
                        required
                        id="rol"
                        name="rol"
                        label="Rol"
                        items={roles.map((i) => ({
                            id: i.id,
                            label: i.nombre,
                        }))}
                        value={formik.values.rol}
                        onChange={formik.handleChange}
                        error={formik.touched.rol && Boolean(formik.errors.rol)}
                        errorMessage={formik.touched.rol && formik.errors.rol}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        autoComplete="off"
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

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="correo_principal"
                        name="correo_principal"
                        label="Correo principal (UTA)"
                        autoComplete="off"
                        placeholder="usuario@uta.edu.ec"
                        value={formik.values.correo_principal}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.correo_principal &&
                            Boolean(formik.errors.correo_principal)
                        }
                        helperText={
                            formik.touched.correo_principal &&
                            formik.errors.correo_principal
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="correo_secundario"
                        name="correo_secundario"
                        label="Correo secundario (GMAIL)"
                        placeholder="usuario@gmail.com"
                        autoComplete="off"
                        value={formik.values.correo_secundario}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.correo_secundario &&
                            Boolean(formik.errors.correo_secundario)
                        }
                        helperText={
                            formik.touched.correo_secundario &&
                            formik.errors.correo_secundario
                        }
                    />
                </Grid>

                {errorsResponse && <ErrorSummary errors={errorsResponse} />}

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

export default UpdateUser;
