import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { ErrorSummary, Icon, Select } from "components";
import { useAddReserva } from "../hooks/useAddReserva";

export default function AddReserva() {
  const { formik, consejos, loading, refreshNumeracion, errorSummary } =
    useAddReserva();

  const submitting = formik.isSubmitting || loading;

  const preventDefault = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      onReset={() => formik.resetForm()}
      noValidate
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Select
            required
            id="consejo"
            name="consejo"
            label="Consejo"
            items={consejos.map((i) => ({
              id: i.id,
              label: i.nombre,
            }))}
            value={formik.values.consejo}
            onChange={formik.handleChange}
            error={formik.touched.consejo && Boolean(formik.errors.consejo)}
            errorMessage={formik.touched.consejo && formik.errors.consejo}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            disabled
            id="desde"
            name="desde"
            type="number"
            label="Desde"
            margin="normal"
            value={formik.values.desde}
            error={formik.touched.desde && Boolean(formik.errors.desde)}
            helperText={formik.touched.desde && formik.errors.desde}
            InputProps={{
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}

                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => refreshNumeracion()}
                      onMouseDown={preventDefault}
                      edge="end"
                      disabled={submitting}
                    >
                      <Icon icon="autorenew" />
                    </IconButton>
                  </InputAdornment>
                </>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            disabled={submitting}
            id="hasta"
            name="hasta"
            type="number"
            label="Hasta"
            margin="normal"
            value={formik.values.hasta}
            onChange={formik.handleChange}
            error={formik.touched.hasta && Boolean(formik.errors.hasta)}
            helperText={formik.touched.hasta && formik.errors.hasta}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled
            id="total"
            name="total"
            type="number"
            label="Total de números reservados"
            margin="normal"
            value={formik.values.hasta - formik.values.desde + 1}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            disabled
            id="total"
            name="total"
            type="number"
            label="Siguiente número disponible"
            margin="normal"
            value={formik.values.hasta + 1}
            helperText="Esté número no está dentro del rango seleccionado a reservar"
          />
        </Grid>

        {errorSummary && <ErrorSummary errors={errorSummary} />}

        <Grid item xs={12} sm={6}>
          <LoadingButton
            fullWidth
            type="reset"
            color="warning"
            variant="contained"
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
            disabled={submitting}
            loading={submitting}
          >
            Guardar
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
