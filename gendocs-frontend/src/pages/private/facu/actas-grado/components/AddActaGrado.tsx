import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { ErrorSummary, Select, SingleAutoComplete, TitleNav } from "components";
import { ModalidadActaGrado } from "models/enums";
import { IAula, ICanton, IDocente, IEstudiante } from "models/interfaces";
import { useEffect, useMemo, useState } from "react";
import { getAulas, getCantones, getDocentes, getEstudiantes } from "services";
import {
  getOptionLabelAula,
  getOptionLabelCanton,
  getOptionLabelDocente,
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
  const [acDocente, setACDocente] = useState<IDocente | null>(null);

  // FORM

  const {
    formik,
    estadoActas,
    errorSummary,
    handleReset: handleResetForm,
    //
    tipoActasGrado,
    modalidades,
    fetchingRequiredData,
  } = useAddActaGrado({
    estudiante: acEstudiante,
  });

  const submitting = formik.isSubmitting;

  //

  const resetACStates = () => {
    setACEstudiante(null);
    setACCanton(null);
    setACAula(null);
    setACMiembrosPrin([]);
    setACMiembrosSecu([]);
  };

  const handleReset = () => {
    handleResetForm();
    resetACStates();
  };

  //

  useEffect(() => {
    if (!acEstudiante) {
      handleReset();
      formik.setFieldValue("estudiante", null);
      return;
    }

    formik.setFieldValue("estudiante", acEstudiante.id);
  }, [acEstudiante]);

  useEffect(() => {
    formik.setFieldValue("docente", acDocente?.id || null);
  }, [acDocente]);

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

  const isPRE = formik.values.modalidad_acta_grado === ModalidadActaGrado.PRE;
  const isONL = formik.values.modalidad_acta_grado === ModalidadActaGrado.ONL;

  const estudianteSeleccionado = Boolean(
    formik.values.estudiante &&
      formik.values.estudiante > 0 &&
      !fetchingRequiredData
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
          <Grid item xs={12} sm={9} md={8}>
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
                required: true,
                placeholder: "Cédula | Nombres | Apellidos | Matrícula | Folio",
                error:
                  formik.touched.estudiante &&
                  Boolean(formik.errors.estudiante),
                helperText:
                  formik.touched.estudiante && formik.errors.estudiante,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={4}>
            <TextField
              fullWidth
              required
              disabled={submitting || !estudianteSeleccionado}
              id="numeracion"
              name="numeracion"
              type="number"
              label="Numeración"
              margin="normal"
              value={formik.values.numeracion}
              onChange={formik.handleChange}
              error={
                formik.touched.numeracion && Boolean(formik.errors.numeracion)
              }
              helperText={formik.touched.numeracion && formik.errors.numeracion}
              InputProps={{
                endAdornment: fetchingRequiredData ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null,
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
                disabled: submitting || !estudianteSeleccionado,
                isOptionEqualToValue: isOptionEqualToValueCanton,
                getOptionLabel: getOptionLabelCanton,
              }}
              TextFieldProps={{
                label: "Cantón de redidencia",
                placeholder: "Nombre",
                required: true,
                error: formik.touched.canton && Boolean(formik.errors.canton),
                helperText: formik.touched.canton && formik.errors.canton,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              disabled={submitting || !estudianteSeleccionado}
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
              disabled={submitting || !estudianteSeleccionado}
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
              disabled={submitting || !estudianteSeleccionado}
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
              disabled={submitting || !estudianteSeleccionado}
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
              fullWidth
              disabled={submitting || !estudianteSeleccionado}
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

          <Grid item xs={12} sm={6}>
            <Select
              required
              id="tipo_acta"
              name="tipo_acta"
              label="Tipo de acta"
              disabled={submitting || !estudianteSeleccionado}
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

          <Grid item xs={12} sm={6}>
            <Select
              required
              id="estado_acta"
              name="estado_acta"
              label="Estado acta"
              disabled={submitting || !estudianteSeleccionado}
              items={estadoActas.map((i) => ({
                id: i.id,
                label: i.nombre_fem,
              }))}
              value={formik.values.estado_acta}
              onChange={formik.handleChange}
              error={
                formik.touched.estado_acta && Boolean(formik.errors.estado_acta)
              }
              errorMessage={
                formik.touched.estado_acta && formik.errors.estado_acta
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <SingleAutoComplete
              key="autocomplete-presidente"
              value={acDocente}
              onChange={setACDocente}
              hookProps={{
                fetch: getDocentes,
                preventSubmitOnOpen: true,
              }}
              AutoCompleteProps={{
                id: "autocomplete-presidente",
                disabled: submitting || !estudianteSeleccionado,
                isOptionEqualToValue: isOptionEqualToValueDocente,
                getOptionLabel: getOptionLabelDocente,
              }}
              TextFieldProps={{
                label: "Presidente",
                placeholder: "Cédula | Nombres",
                disabled: submitting || !estudianteSeleccionado,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="Fecha sustentación/incorporación"
              disabled={submitting || !estudianteSeleccionado}
              value={formik.values.fecha_presentacion}
              onChange={(date) =>
                formik.setFieldValue("fecha_presentacion", date)
              }
              renderInput={(props) => (
                <TextField
                  {...props}
                  margin="normal"
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

          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              margin="normal"
              type="number"
              id="duracion"
              name="duracion"
              label="Duración (min)"
              disabled={submitting || !estudianteSeleccionado}
              value={formik.values.duracion}
              onChange={formik.handleChange}
              error={formik.touched.duracion && Boolean(formik.errors.duracion)}
              helperText={formik.touched.duracion && formik.errors.duracion}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Select
              required
              id="modalidad_acta_grado"
              name="modalidad_acta_grado"
              label="Modalidad acta"
              disabled={submitting || !estudianteSeleccionado}
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

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: isONL ? "inline" : "none" }}>
              <Fade in={isONL}>
                <TextField
                  fullWidth
                  margin="normal"
                  id="link"
                  name="link"
                  label="Link"
                  disabled={submitting || !estudianteSeleccionado}
                  value={formik.values.link}
                  onChange={formik.handleChange}
                  error={formik.touched.link && Boolean(formik.errors.link)}
                  helperText={formik.touched.link && formik.errors.link}
                />
              </Fade>
            </Box>

            <Box sx={{ display: isPRE ? "flex" : "none" }}>
              <Fade in={isPRE}>
                <Box width={"100%"} sx={{ display: "flex" }} gap={2}>
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
                      disabled: submitting || !estudianteSeleccionado,
                      isOptionEqualToValue: isOptionEqualToValueAula,
                      getOptionLabel: getOptionLabelAula,
                    }}
                    TextFieldProps={{
                      label: "Aula",
                      placeholder: "Nombre",
                      disabled: submitting || !estudianteSeleccionado,
                    }}
                  />
                </Box>
              </Fade>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Stack>
              <FormControlLabel
                label="Solicitar especie"
                control={
                  <Checkbox
                    id="solicitar_especie"
                    name="solicitar_especie"
                    disabled={submitting || !estudianteSeleccionado}
                    checked={formik.values.solicitar_especie}
                    onChange={formik.handleChange}
                  />
                }
              />
              <FormControlLabel
                label="Envío financiero especie de título"
                control={
                  <Checkbox
                    id="envio_financiero_especie"
                    name="envio_financiero_especie"
                    disabled={submitting || !estudianteSeleccionado}
                    checked={formik.values.envio_financiero_especie}
                    onChange={formik.handleChange}
                  />
                }
              />
            </Stack>
          </Grid>

          {errorSummary && <ErrorSummary errors={errorSummary} />}

          {/* <Grid item xs={12}>
            <pre>{JSON.stringify(formik.values, null, 2)}</pre>
          </Grid> */}

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
