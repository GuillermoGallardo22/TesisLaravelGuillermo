import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Title from "components/Title";
import usePassword from "./hooks/usePassword";
import useProfile from "./hooks/useProfile";

export default function Profile() {
  return (
    <Stack gap={8}>
      <UserInfo />
      <UserPassword />
    </Stack>
  );
}

function UserInfo() {
  const { formik } = useProfile();
  const submitting = formik.isSubmitting;

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Title>Perfil</Title>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="name"
            name="name"
            label="Nombre"
            autoComplete="off"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>

        <Grid item sm={12} md={4}>
          <TextField
            disabled
            required
            fullWidth
            label="Rol"
            value={[formik.values.roles]}
          />
        </Grid>

        <Grid item sm={12} md={8}>
          <TextField
            disabled
            required
            fullWidth
            label="Módulos"
            InputProps={{
              startAdornment: (
                <Box display="flex" gap={0.5}>
                  {formik.values.modulos.map((m, i) => (
                    <Chip key={i} disabled label={m.name} size="small" />
                  ))}
                </Box>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            required
            fullWidth
            label="Correo principal (UTA)"
            value={formik.values.email}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            required
            fullWidth
            label="Correo secundario (GMAIL)"
            value={formik.values.email_gmail}
          />
        </Grid>

        <Grid item xs={12}>
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            disabled={submitting}
            loading={submitting}
          >
            Actualizar
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

function UserPassword() {
  const { formik } = usePassword();
  const submitting = formik.isSubmitting;

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Title>Cambiar la contraseña</Title>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            type="password"
            id="currentPassword"
            name="currentPassword"
            label="Contraseña anterior"
            autoComplete="off"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            }
            helperText={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            type="password"
            id="newPassword"
            name="newPassword"
            label="Nueva contraseña"
            autoComplete="off"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar nueva contraseña"
            autoComplete="off"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Grid>

        <Grid item sm={12}>
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            disabled={submitting}
            loading={submitting}
          >
            Actualizar contraseña
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
