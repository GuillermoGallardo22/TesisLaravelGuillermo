import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ErrorSummary from "components/ErrorSummary";
import TitleNav from "components/TitleNav";
import { useAutocomplete } from "hooks/useAutocomplete";
import { IDocente } from "models/interfaces/IDocente";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocentes } from "services/docentes";
import { useUpdateCargo } from "../hooks/useUpdateCargo";

const UpdateCargo = () => {
  const { cargoId = "" } = useParams<{ cargoId: string }>();

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
    setValue,
  } = useAutocomplete<IDocente>({
    fetch: getDocentes,
    preventSubmitOnOpen: true,
  });

  const { formik, errorSummary } = useUpdateCargo({
    cargoId,
    setInitDocenteValue: setValue,
    resetForm: resetValueDocente,
  });

  const submitting = formik.isSubmitting;

  useEffect(() => {
    formik.setFieldValue("docente", valueDocente?.id || -1);
  }, [valueDocente]);

  return (
    <Stack spacing={2}>
      <TitleNav title="Actualizar cargo" />
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
              disabled
              fullWidth
              margin="normal"
              id="variable"
              name="variable"
              label="Variable"
              value={formik.values.variable}
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
                  label="Funcionario"
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

export default UpdateCargo;
