import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ErrorSummary, TitleNav } from "components";
import { useAutocomplete } from "hooks";
import { IDocente } from "models/interfaces";
import { useEffect } from "react";
import { getDocentes } from "services";
import { useAddCargo } from "../hooks/useAddCargo";

const AddCargo = () => {
  const {
    items: docentes,
    isOpen: isOpenDocente,
    openModal: openModalDocente,
    closeModal: closeModalDocente,
    searching: searchingDocente,
    value: valueDocente,
    onChange: onChangeDocente,
    onInputChange: onInputChangeDocente,
    resetValue: resetValueDocente,
  } = useAutocomplete<IDocente>({
    fetch: getDocentes,
    preventSubmitOnOpen: true,
  });

  const { formik, errorSummary } = useAddCargo({
    resetForm: () => {
      resetValueDocente();
    },
  });

  const submitting = formik.isSubmitting;

  useEffect(() => {
    formik.setFieldValue("docente", valueDocente?.id || -1);
  }, [valueDocente]);

  return (
    <Stack spacing={2}>
      <TitleNav title="Crear cargo" />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              margin="normal"
              id="variable"
              name="variable"
              label="Variable"
              value={formik.values.variable}
              onChange={formik.handleChange}
              error={formik.touched.variable && Boolean(formik.errors.variable)}
              helperText={formik.touched.variable && formik.errors.variable}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              id="autocomplete-miembros"
              open={isOpenDocente}
              onOpen={openModalDocente}
              onClose={closeModalDocente}
              options={docentes}
              isOptionEqualToValue={(option, value) =>
                option.nombres === value.nombres
              }
              getOptionLabel={(option) => option.nombres}
              loading={searchingDocente}
              filterOptions={(x) => x}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={valueDocente}
              onChange={onChangeDocente}
              onInputChange={onInputChangeDocente}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Docente"
                  margin="normal"
                  placeholder="Cédula | Nombres | Apellidos"
                  error={
                    formik.touched.docente && Boolean(formik.errors.docente)
                  }
                  helperText={formik.touched.docente && formik.errors.docente}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {searchingDocente ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
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

export default AddCargo;
