import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField } from "@mui/material";
import { useAddCelda, useAddCeldaProps } from "../hooks/useAddCelda";

type AddCeldaProps = useAddCeldaProps;

const AddCelda: React.FunctionComponent<AddCeldaProps> = ({ tipoActa }) => {
  const { formik } = useAddCelda({ tipoActa });

  const submitting = formik.isSubmitting;

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Grid container alignItems="center" direction="row" spacing={2}>
        <Grid item xs={4} sm={4}>
          <TextField
            fullWidth
            required
            disabled={submitting}
            id="descripcion"
            name="descripcion"
            label="Descripción"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            error={
              formik.touched.descripcion && Boolean(formik.errors.descripcion)
            }
            helperText={formik.touched.descripcion && formik.errors.descripcion}
          />
        </Grid>
        <Grid item xs={4} sm={4}>
          <TextField
            fullWidth
            required
            disabled={submitting}
            id="celda"
            name="celda"
            label="Celda"
            value={formik.values.celda}
            onChange={formik.handleChange}
            error={formik.touched.celda && Boolean(formik.errors.celda)}
            helperText={formik.touched.celda && formik.errors.celda}
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
        </Grid>
        <Grid item xs={4} sm={4}>
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
};

export default AddCelda;
