import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ErrorSummary, Select, TitleNav } from "components";
import { useAddConsejo } from "../hooks/useAddConsejo";

export default function AddConsejo() {
  const { formik, tipoConsejos, loading, errorSummary } = useAddConsejo();

  const submitting = loading || formik.isSubmitting;

  return (
    <Stack spacing={2}>
      <TitleNav title="Crear consejo" />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              required
              id="tipo_consejo"
              name="tipo_consejo"
              label="Tipo"
              items={tipoConsejos.map((item) => ({
                id: item.id,
                label: item.nombre,
              }))}
              value={formik.values.tipo_consejo}
              onChange={formik.handleChange}
              error={
                formik.touched.tipo_consejo &&
                Boolean(formik.errors.tipo_consejo)
              }
              errorMessage={
                formik.touched.tipo_consejo && formik.errors.tipo_consejo
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
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
            />
          </Grid>

          <Grid item xs={12}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField
                  {...props}
                  required
                  fullWidth
                  error={formik.touched.fecha && Boolean(formik.errors.fecha)}
                  helperText={formik.touched.fecha && formik.errors.fecha}
                />
              )}
              label="Fecha"
              value={formik.values.fecha}
              onChange={(date) => formik.setFieldValue("fecha", date)}
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
    </Stack>
  );
}
