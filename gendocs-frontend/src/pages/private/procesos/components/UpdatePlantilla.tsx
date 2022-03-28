import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { Select } from "components";
import { useParams } from "react-router-dom";
import { useUpdatePlantilla } from "../hooks/useUpdatePlantilla";

const UpdatePlantilla = () => {
    const { templateId = "" } = useParams<{ templateId: string }>();
    const { formik, procesos, loading } = useUpdatePlantilla({
        templateId: +templateId,
    });

    const submitting = formik.isSubmitting || loading;

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
                        id="proceso"
                        name="proceso"
                        label="Procesos"
                        items={procesos.map((item) => ({
                            id: item.id,
                            label: item.nombre,
                        }))}
                        value={formik.values.proceso as number}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.proceso &&
                            Boolean(formik.errors.proceso)
                        }
                        errorMessage={
                            formik.touched.proceso && formik.errors.proceso
                        }
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

export default UpdatePlantilla;
