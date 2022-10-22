import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ErrorSummary from "components/ErrorSummary";
import Icon from "components/Icon";
import Select from "components/Select";
import TitleNav from "components/TitleNav";
import { useModuleContext } from "contexts/ModuleContext";
import { useAutocomplete } from "hooks/useAutocomplete";
import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useMultiAutocomplete } from "hooks/useMultiAutocomplete";
import { IDocente } from "models/interfaces/IDocente";
import { IEstudiante } from "models/interfaces/IEstudiante";
import { IPlantilla } from "models/interfaces/IPlantilla";
import { IProceso } from "models/interfaces/IProceso";
import { useEffect } from "react";
import { getDocentes } from "services/docentes";
import { getEstudiantes } from "services/estudiantes";
import { getPlantillasByProcesoId } from "services/plantillas";
import { getProcesos } from "services/proceso";
import useAddDocumento from "../hooks/useAddDocumento";
import { NumeracionModal } from "./NumeracionModal";

function AddDocumento() {
  const { module } = useModuleContext();

  // PROCESOS
  const {
    items: itemsPRO,
    isOpen: isOpenPRO,
    openModal: openModalPRO,
    closeModal: closeModalPRO,
    searching: searchingPRO,
    value: valuePRO,
    onChange: onChangePRO,
    onInputChange: onInputChangePRO,
    resetValue: resetValuePRO,
  } = useAutocomplete<IProceso>({
    fetch: getProcesos,
    filters: {
      module,
    },
  });

  // PLANTILLAS
  const {
    items: itemsPLA,
    isOpen: isOpenPLA,
    openModal: openModalPLA,
    closeModal: closeModalPLA,
    searching: searchingPLA,
    value: valuePLA,
    onChange: onChangePLA,
    onInputChange: onInputChangePLA,
    resetValue: resetValuePLA,
  } = useAutocomplete<IPlantilla>({
    fetch: getPlantillasByProcesoId,
    filters: {
      proceso: valuePRO?.id || -1,
    },
  });

  // ESTUDIANTE
  const {
    items: itemsEST,
    isOpen: isOpenEST,
    openModal: openModalEST,
    closeModal: closeModalEST,
    searching: searchingEST,
    value: valueEST,
    onChange: onChangeEST,
    onInputChange: onInputChangeEST,
    resetValue: resetValueEST,
  } = useAutocomplete<IEstudiante>({
    fetch: getEstudiantes,
    preventSubmitOnOpen: true,
  });

  // DOCENTES
  const {
    values: valuesDOC,
    options: optionsDOC,
    searching: searchingDOC,
    setOptions: setOptionsDOC,
    setInputValue: setInputValueDOC,
    setValues: setValuesDOC,
    resetValues: resetValuesDOC,
  } = useMultiAutocomplete<IDocente>({
    fetch: getDocentes,
  });

  useEffect(() => {
    formik.setFieldValue("proceso", valuePRO?.id || -1);
    //
    if (!valuePRO && valuePLA) {
      resetValuePLA();
    }
  }, [valuePRO]);

  useEffect(() => {
    formik.setFieldValue("plantilla", valuePLA?.id || -1);
  }, [valuePLA]);

  useEffect(() => {
    formik.setFieldValue("estudiante", valueEST?.id || null);
  }, [valueEST]);

  useEffect(() => {
    formik.setFieldValue("docentes", valuesDOC.map((d) => d.id).filter(Number));
  }, [valuesDOC.length]);

  const handleResetAutocomplete = () => {
    resetValueEST();
    resetValuePLA();
    resetValuePRO();
    resetValuesDOC();
  };

  // FORM
  const {
    formik,
    consejos,
    reservados,
    encolados,
    loading,
    refreshNumeracion,
    errorSummary,
    handleReset: handleResetForm,
  } = useAddDocumento({
    onReset: handleResetAutocomplete,
  });

  const submitting = formik.isSubmitting || loading;

  const handleReset = () => {
    handleResetAutocomplete();
    handleResetForm();
  };

  const preventDefault = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const { closeModal, isVisible, openModal } = useConfirmationDialog();

  return (
    <Stack spacing={2}>
      <TitleNav title="Generar documento" />
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        onReset={handleReset}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              disabled={submitting}
              id="numero"
              name="numero"
              type="number"
              label="Número"
              margin="normal"
              value={formik.values.numero}
              onChange={formik.handleChange}
              error={formik.touched.numero && Boolean(formik.errors.numero)}
              helperText={formik.touched.numero && formik.errors.numero}
              InputProps={{
                endAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}

                    <InputAdornment position="end">
                      <IconButton
                        onClick={openModal}
                        onMouseDown={preventDefault}
                        edge="end"
                        disabled={submitting}
                      >
                        <Icon icon="edit" />
                      </IconButton>
                    </InputAdornment>

                    <InputAdornment position="end">
                      <IconButton
                        onClick={refreshNumeracion}
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
            <Select
              required
              disabled={submitting}
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
            <Autocomplete
              fullWidth
              id="autocomplete-procesos"
              disabled={submitting}
              open={isOpenPRO}
              onOpen={openModalPRO}
              onClose={closeModalPRO}
              options={itemsPRO}
              isOptionEqualToValue={(option, value) =>
                option.nombre === value.nombre
              }
              getOptionLabel={(option) => option.nombre}
              loading={searchingPRO}
              filterOptions={(x) => x}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={valuePRO}
              onChange={onChangePRO}
              onInputChange={onInputChangePRO}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Procesos"
                  margin="normal"
                  error={
                    formik.touched.proceso && Boolean(formik.errors.proceso)
                  }
                  helperText={
                    (formik.touched.proceso && formik.errors.proceso) ||
                    "Para mejores coincidencias introduzca el nombre del proceso"
                  }
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {searchingPRO ? (
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

          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              id="plantilla"
              disabled={!valuePRO || submitting}
              open={isOpenPLA}
              onOpen={openModalPLA}
              onClose={closeModalPLA}
              options={itemsPLA}
              isOptionEqualToValue={(option, value) =>
                option.nombre === value.nombre
              }
              getOptionLabel={(option) => option.nombre}
              loading={searchingPLA}
              filterOptions={(x) => x}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={valuePLA}
              onChange={onChangePLA}
              onInputChange={onInputChangePLA}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  margin="normal"
                  label="Plantillas"
                  error={Boolean(formik.errors.plantilla) && Boolean(valuePRO)}
                  helperText={
                    formik.errors.plantilla ||
                    "Para mejores coincidencias introduzca el nombre de la plantilla"
                  }
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {searchingPLA ? (
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

          <Grid item xs={12} sm={6}>
            <Autocomplete
              fullWidth
              id="autocomplete-estudiante"
              disabled={submitting}
              open={isOpenEST}
              onOpen={openModalEST}
              onClose={closeModalEST}
              options={itemsEST}
              isOptionEqualToValue={(option, value) =>
                option.cedula +
                  " - " +
                  [option.nombres, option.apellidos].join(" ") ===
                value.cedula +
                  " - " +
                  [value.nombres, value.apellidos].join(" ")
              }
              getOptionLabel={({ cedula, nombres, apellidos }) =>
                cedula + " - " + [nombres, apellidos].join(" ")
              }
              loading={searchingEST}
              filterOptions={(x) => x}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={valueEST}
              onChange={onChangeEST}
              onInputChange={onInputChangeEST}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Estudiante"
                  margin="normal"
                  placeholder="Cédula | Nombres | Apellidos | Matrícula | Folio"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {searchingEST ? (
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

          <Grid item xs={12} sm={6}>
            <Autocomplete
              id="autocomplete-docentes"
              freeSolo
              multiple
              autoComplete
              includeInputInList
              filterSelectedOptions
              disabled={submitting}
              value={valuesDOC}
              options={optionsDOC}
              filterOptions={(x) => x}
              onClose={() => setOptionsDOC([])}
              isOptionEqualToValue={(o, v) => o.id === v.id}
              getOptionLabel={(option: any) => option?.nombres || ""}
              onChange={(_, newValue: any) => setValuesDOC(newValue)}
              onInputChange={(_, newInputValue) =>
                setInputValueDOC(newInputValue)
              }
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.nombres}
                    {...getTagProps({ index })}
                    key={index}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin="normal"
                  label="Docentes"
                  placeholder="Cédula | Nombres"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {searchingDOC ? (
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

          <Grid item xs={12}>
            <TextField
              fullWidth
              disabled={submitting}
              multiline
              rows={4}
              margin="normal"
              id="descripcion"
              name="descripcion"
              label="Descripción"
              autoComplete="off"
              value={formik.values.descripcion || ""}
              onChange={formik.handleChange}
              error={
                formik.touched.descripcion && Boolean(formik.errors.descripcion)
              }
              helperText={
                formik.touched.descripcion && formik.errors.descripcion
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    id="otro"
                    name="otro"
                    disabled={submitting}
                    checked={formik.values.otro}
                    onChange={formik.handleChange}
                  />
                }
                label="Mantener formato"
              />
            </Box>
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

      <NumeracionModal
        isVisible={isVisible}
        onCancel={closeModal}
        onApprove={(n) => formik.setFieldValue("numero", n)}
        reservados={reservados}
        encolados={encolados}
      />
    </Stack>
  );
}

export default AddDocumento;
