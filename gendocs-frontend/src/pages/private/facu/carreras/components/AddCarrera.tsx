import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import ErrorSummary from "components/ErrorSummary";
import TitleNav from "components/TitleNav";
import { useAddCarrera } from "../hooks/useAddCarrera";

export default function AddCarrera() {
  const { formik, errorSummary, handleReset } = useAddCarrera();

  const submitting = formik.isSubmitting;

  return (
    <Stack spacing={2}>
      <TitleNav title="Crear carrera" />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        onReset={handleReset}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              margin="normal"
              id="nombre"
              name="nombre"
              label="Nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              required
              fullWidth
              margin="normal"
              id="creditos"
              name="creditos"
              label="Créditos"
              value={formik.values.creditos}
              onChange={formik.handleChange}
              error={formik.touched.creditos && Boolean(formik.errors.creditos)}
              helperText={formik.touched.creditos && formik.errors.creditos}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              margin="normal"
              id="titulo_mas"
              name="titulo_mas"
              label="Título (Masculino)"
              value={formik.values.titulo_mas}
              onChange={formik.handleChange}
              error={
                formik.touched.titulo_mas && Boolean(formik.errors.titulo_mas)
              }
              helperText={formik.touched.titulo_mas && formik.errors.titulo_mas}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              margin="normal"
              id="titulo_fem"
              name="titulo_fem"
              label="Título (Femenino)"
              value={formik.values.titulo_fem}
              onChange={formik.handleChange}
              error={
                formik.touched.titulo_fem && Boolean(formik.errors.titulo_fem)
              }
              helperText={formik.touched.titulo_fem && formik.errors.titulo_fem}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: 2 }}>
            <FormLabel component="legend">Estado</FormLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.estado}
                  onChange={(e) =>
                    formik.setFieldValue("estado", e.target.checked)
                  }
                />
              }
              label={formik.values.estado ? "Activado" : "Desactivado"}
              labelPlacement="start"
            />
          </Grid>

          <Grid item xs={12}>
            <ErrorSummary errors={errorSummary} />
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
    </Stack>
  );
}
