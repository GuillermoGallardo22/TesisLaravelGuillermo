import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ErrorSummary from "components/ErrorSummary";
import TitleNav from "components/TitleNav";
import { Genero } from "models/enums/Genero";
import { useAddSimpleDocente } from "../hooks/useAddSimpleDocente";
import Select from "components/Select";


// TODO: ADD MULTIPLE TEACHER FUNCIONALITY
const AddDocente = () => {
  const { formik, carreras, errorSummary } = useAddSimpleDocente();

  const submitting = formik.isSubmitting;

  return (
    <Stack spacing={2}>
      <TitleNav title="Crear docente" />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        noValidate
      >
        <Grid container spacing={2}>

        <Grid item xs={12} sm={6}>
          <Select
            id="carrera"
            name="carrera"
            label="Carrera"
            items={carreras.map((item) => ({
              id: item.id,
              label: item.nombre,
            }))}
            value={formik.values.carrera}
            onChange={formik.handleChange}
            error={formik.touched.carrera && Boolean(formik.errors.carrera)}
            errorMessage={formik.touched.carrera && formik.errors.carrera}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Select
            id="genero"
            name="genero"
            label="Género"
            items={[
              {
                id: Genero.MASCULINO,
                label: "Masculino",
              },
              {
                id: Genero.FEMENINO,
                label: "Femenino",
              },
            ]}
            value={formik.values.genero || ""}
            onChange={formik.handleChange}
            error={formik.touched.genero && Boolean(formik.errors.genero)}
            errorMessage={formik.touched.genero && formik.errors.genero}
          />
        </Grid>


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
              error={formik.touched.cedula && Boolean(formik.errors.cedula)}
              helperText={formik.touched.cedula && formik.errors.cedula}
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
              error={formik.touched.nombres && Boolean(formik.errors.nombres)}
              helperText={formik.touched.nombres && formik.errors.nombres}
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
              error={formik.touched.celular && Boolean(formik.errors.celular)}
              helperText={formik.touched.celular && formik.errors.celular}
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
              error={formik.touched.telefono && Boolean(formik.errors.telefono)}
              helperText={formik.touched.telefono && formik.errors.telefono}
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
                formik.touched.correo_uta && Boolean(formik.errors.correo_uta)
              }
              helperText={formik.touched.correo_uta && formik.errors.correo_uta}
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
              error={formik.touched.correo && Boolean(formik.errors.correo)}
              helperText={formik.touched.correo && formik.errors.correo}
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
};

export default AddDocente;
