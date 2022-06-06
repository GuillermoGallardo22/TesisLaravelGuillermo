import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { ErrorSummary, Select, SelectMulti, TitleNav } from "components";
import { useParams } from "react-router-dom";
import { useUpdateUsuario } from "../hooks/useUpdateUsuario";

const UpdateUsuario = () => {
  const { userId = "" } = useParams<{ userId: string }>();
  const { formik, handleReset, errorsResponse, roles, loading, modulos } =
    useUpdateUsuario({
      userId,
    });

  const submitting = formik.isSubmitting || loading;

  return (
    <Stack spacing={2}>
      <TitleNav title="Actualizar usuario" />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        onReset={handleReset}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item sm={12} md={4}>
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

          <Grid item sm={12} md={8}>
            <SelectMulti
              id="select-multi-modulo"
              name="select-multi"
              label="Módulos"
              required
              items={modulos.map((m) => ({
                id: m.id,
                label: m.name,
              }))}
              values={formik.values.modulos}
              onChange={(ids) => formik.setFieldValue("modulos", ids)}
              error={formik.touched.modulos && Boolean(formik.errors.modulos)}
              errorMessage={formik.touched.modulos && formik.errors.modulos}
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
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={formik.touched.nombre && formik.errors.nombre}
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

          <Grid item xs={12}>
            <FormLabel component="legend">Estado</FormLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.status}
                  onChange={(e) =>
                    formik.setFieldValue("status", e.target.checked)
                  }
                />
              }
              label={formik.values.status ? "Activado" : "Desactivado"}
              labelPlacement="start"
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
    </Stack>
  );
};

export default UpdateUsuario;
