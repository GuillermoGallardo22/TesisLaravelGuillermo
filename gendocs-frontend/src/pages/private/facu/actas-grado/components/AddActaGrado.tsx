import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import {
  ErrorSummary,
  MultipleAutoComplete,
  Select,
  SingleAutoComplete,
  TitleNav,
} from "components";
import { ModalidadActaGrado } from "models/enums";
import { IAula, ICanton, IDocente, IEstudiante } from "models/interfaces";
import { useEffect, useMemo, useState } from "react";
import { getAulas, getCantones, getDocentes, getEstudiantes } from "services";
import {
  getOptionLabelAula,
  getOptionLabelCanton,
  getOptionLabelDocente,
  getOptionLabelDocente2,
  getOptionLabelEstudiante,
  isOptionEqualToValueAula,
  isOptionEqualToValueCanton,
  isOptionEqualToValueDocente,
  isOptionEqualToValueEstudiante,
} from "utils";
import { useAddActaGrado } from "../hooks/useAddActaGrado";

const AddActaGrado: React.FunctionComponent = () => {
  const [acAula, setACAula] = useState<IAula | null>(null);
  const [acCanton, setACCanton] = useState<ICanton | null>(null);
  const [acMiembrosPrin, setACMiembrosPrin] = useState<IDocente[]>([]);
  const [acMiembrosSecu, setACMiembrosSecu] = useState<IDocente[]>([]);
  const [acEstudiante, setACEstudiante] = useState<IEstudiante | null>(null);

  // FORM

  const {
    formik,
    estadoActas,
    errorSummary,
    handleReset: handleResetForm,
    //
    tipoActasGrado,
    modalidades,
  } = useAddActaGrado({
    estudiante: acEstudiante,
  });

  const submitting = formik.isSubmitting;

  //

  useEffect(() => {
    formik.setFieldValue("estudiante", acEstudiante?.id || null);
  }, [acEstudiante]);

  useEffect(() => {
    formik.setFieldValue("canton", acCanton?.id || null);
  }, [acCanton]);

  useEffect(() => {
    formik.setFieldValue("aula", acAula?.id || null);
  }, [acAula]);

  useEffect(() => {
    formik.setFieldValue(
      "miembros_principales",
      acMiembrosPrin.map((d) => d.id).filter(Number)
    );
  }, [acMiembrosPrin.length]);

  useEffect(() => {
    formik.setFieldValue(
      "miembros_suplentes",
      acMiembrosSecu.map((d) => d.id).filter(Number)
    );
  }, [acMiembrosSecu.length]);

  //

  const resetStates = () => {
    setACEstudiante(null);
    setACCanton(null);
    setACAula(null);
    setACMiembrosPrin([]);
    setACMiembrosSecu([]);
  };

  const handleReset = () => {
    handleResetForm();
    resetStates();
  };

  const isPRE = useMemo(
    () => formik.values.modalidad_acta_grado === ModalidadActaGrado.PRE,
    [formik.values.modalidad_acta_grado]
  );

  const isONL = useMemo(
    () => formik.values.modalidad_acta_grado === ModalidadActaGrado.ONL,
    [formik.values.modalidad_acta_grado]
  );

  return (
    <Stack spacing={2}>
      <TitleNav title="Agregar acta de grado" />

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        onReset={handleReset}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SingleAutoComplete
              key="autocomplete-estudiante"
              value={acEstudiante}
              onChange={setACEstudiante}
              hookProps={{
                fetch: getEstudiantes,
                preventSubmitOnOpen: true,
              }}
              AutoCompleteProps={{
                id: "autocomplete-estudiante",
                disabled: submitting,
                isOptionEqualToValue: isOptionEqualToValueEstudiante,
                getOptionLabel: getOptionLabelEstudiante,
              }}
              TextFieldProps={{
                label: "Estudiante",
                placeholder: "Cédula | Nombres | Apellidos | Matrícula | Folio",
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <SingleAutoComplete
              key="autocomplete-canton"
              value={acCanton}
              onChange={setACCanton}
              hookProps={{
                fetch: getCantones,
                preventSubmitOnOpen: true,
              }}
              AutoCompleteProps={{
                id: "autocomplete-canton",
                disabled: submitting,
                isOptionEqualToValue: isOptionEqualToValueCanton,
                getOptionLabel: getOptionLabelCanton,
              }}
              TextFieldProps={{
                label: "Cantón de redidencia",
                placeholder: "Nombre",
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              margin="normal"
              id="titulo_bachiller"
              name="titulo_bachiller"
              label="Título bachiller"
              value={formik.values.titulo_bachiller}
              onChange={formik.handleChange}
              error={
                formik.touched.titulo_bachiller &&
                Boolean(formik.errors.titulo_bachiller)
              }
              helperText={
                formik.touched.titulo_bachiller &&
                formik.errors.titulo_bachiller
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Fecha inicio estudios"
              value={formik.values.fecha_inicio_estudios}
              onChange={(date) =>
                formik.setFieldValue("fecha_inicio_estudios", date)
              }
              renderInput={(props) => (
                <TextField
                  {...props}
                  margin="normal"
                  required
                  fullWidth
                  error={
                    formik.touched.fecha_inicio_estudios &&
                    Boolean(formik.errors.fecha_inicio_estudios)
                  }
                  helperText={
                    formik.touched.fecha_inicio_estudios &&
                    formik.errors.fecha_inicio_estudios
                  }
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Fecha fin estudios"
              value={formik.values.fecha_fin_estudios}
              onChange={(date) =>
                formik.setFieldValue("fecha_fin_estudios", date)
              }
              renderInput={(props) => (
                <TextField
                  {...props}
                  margin="normal"
                  required
                  fullWidth
                  error={
                    formik.touched.fecha_fin_estudios &&
                    Boolean(formik.errors.fecha_fin_estudios)
                  }
                  helperText={
                    formik.touched.fecha_fin_estudios &&
                    formik.errors.fecha_fin_estudios
                  }
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              margin="normal"
              type="number"
              id="creditos_aprobados"
              name="creditos_aprobados"
              label="Créditos aprobados"
              value={formik.values.creditos_aprobados}
              onChange={formik.handleChange}
              error={
                formik.touched.creditos_aprobados &&
                Boolean(formik.errors.creditos_aprobados)
              }
              helperText={
                formik.touched.creditos_aprobados &&
                formik.errors.creditos_aprobados
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              margin="normal"
              type="number"
              id="horas_practicas"
              name="horas_practicas"
              label="Horas de prácticas"
              value={formik.values.horas_practicas}
              onChange={formik.handleChange}
              error={
                formik.touched.horas_practicas &&
                Boolean(formik.errors.horas_practicas)
              }
              helperText={
                formik.touched.horas_practicas && formik.errors.horas_practicas
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Select
              id="tipo_acta"
              name="tipo_acta"
              label="Tipo de acta"
              items={tipoActasGrado.map((i) => ({
                id: i.codigo,
                label: i.nombre,
              }))}
              value={formik.values.tipo_acta}
              onChange={formik.handleChange}
              error={
                formik.touched.tipo_acta && Boolean(formik.errors.tipo_acta)
              }
              errorMessage={formik.touched.tipo_acta && formik.errors.tipo_acta}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Select
              id="declarada"
              name="declarada"
              label="Estado acta"
              items={estadoActas.map((i) => ({
                id: i.id,
                label: i.nombre_fem,
              }))}
              value={formik.values.declarada}
              onChange={formik.handleChange}
              error={
                formik.touched.declarada && Boolean(formik.errors.declarada)
              }
              errorMessage={formik.touched.declarada && formik.errors.declarada}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <DateTimePicker
              label="Fecha presentación"
              value={formik.values.fecha_presentacion}
              onChange={(date) =>
                formik.setFieldValue("fecha_presentacion", date)
              }
              renderInput={(props) => (
                <TextField
                  {...props}
                  margin="normal"
                  required
                  fullWidth
                  error={
                    formik.touched.fecha_presentacion &&
                    Boolean(formik.errors.fecha_presentacion)
                  }
                  helperText={
                    formik.touched.fecha_presentacion &&
                    formik.errors.fecha_presentacion
                  }
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select
              required={true}
              id="modalidad_acta_grado"
              name="modalidad_acta_grado"
              label="Modalidad acta"
              items={modalidades.map((i) => ({
                id: i.codigo,
                label: i.nombre,
              }))}
              value={formik.values.modalidad_acta_grado}
              onChange={formik.handleChange}
              error={
                formik.touched.modalidad_acta_grado &&
                Boolean(formik.errors.modalidad_acta_grado)
              }
              errorMessage={
                formik.touched.modalidad_acta_grado &&
                formik.errors.modalidad_acta_grado
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: isONL ? "inline" : "none" }}>
              <Fade in={isONL}>
                <TextField
                  fullWidth
                  margin="normal"
                  id="link"
                  name="link"
                  label="Link"
                  value={formik.values.link}
                  onChange={formik.handleChange}
                  error={formik.touched.link && Boolean(formik.errors.link)}
                  helperText={formik.touched.link && formik.errors.link}
                />
              </Fade>
            </Box>

            <Box sx={{ display: isPRE ? "inline" : "none" }}>
              <Fade in={isPRE}>
                <Box>
                  <SingleAutoComplete
                    key="autocomplete-aulas"
                    value={acAula}
                    onChange={setACAula}
                    hookProps={{
                      fetch: getAulas,
                      preventSubmitOnOpen: true,
                    }}
                    AutoCompleteProps={{
                      id: "autocomplete-aulas",
                      disabled: submitting,
                      isOptionEqualToValue: isOptionEqualToValueAula,
                      getOptionLabel: getOptionLabelAula,
                    }}
                    TextFieldProps={{
                      label: "Aula",
                      placeholder: "Nombre",
                    }}
                  />
                </Box>
              </Fade>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <MultipleAutoComplete
              key="autocomplete-miembros-prin"
              values={acMiembrosPrin}
              onChange={setACMiembrosPrin}
              hookProps={{
                fetch: getDocentes,
              }}
              AutoCompleteProps={{
                id: "autocomplete-miembros-prin",
                isOptionEqualToValue: isOptionEqualToValueDocente,
                getOptionLabel: getOptionLabelDocente,
                disabled: submitting,
              }}
              ChipProps={{
                getOptionLabel: getOptionLabelDocente2,
              }}
              TextFieldProps={{
                label: "Miembros principales",
                placeholder: "Cédula | Nombres",
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <MultipleAutoComplete
              key="autocomplete-miembros-sec"
              values={acMiembrosSecu}
              onChange={setACMiembrosSecu}
              hookProps={{
                fetch: getDocentes,
              }}
              AutoCompleteProps={{
                id: "autocomplete-miembros-sec",
                isOptionEqualToValue: isOptionEqualToValueDocente,
                getOptionLabel: getOptionLabelDocente,
                disabled: submitting,
              }}
              ChipProps={{
                getOptionLabel: getOptionLabelDocente2,
              }}
              TextFieldProps={{
                label: "Miembros suplentes",
                placeholder: "Cédula | Nombres",
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              label="Solicitar especie"
              control={
                <Checkbox
                  id="solicitar_especie"
                  name="solicitar_especie"
                  disabled={submitting}
                  checked={formik.values.solicitar_especie}
                  onChange={formik.handleChange}
                />
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              label="Envío financiero especie de título"
              control={
                <Checkbox
                  id="envio_financiero_especie"
                  name="envio_financiero_especie"
                  disabled={submitting}
                  checked={formik.values.envio_financiero_especie}
                  onChange={formik.handleChange}
                />
              }
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
    </Stack>
  );
};

export default AddActaGrado;
