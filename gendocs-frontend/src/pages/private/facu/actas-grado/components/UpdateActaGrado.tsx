import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import Skeleton from "components/Skeleton";
import TitleNav from "components/TitleNav";
import { useFormik } from "formik";
import { IUpdateActaGrado } from "models/interfaces/IActaGrado";
import { useParams } from "react-router-dom";
import { parseToDate } from "utils/date";
import { getOptionLabelCanton, getOptionLabelEstudiante } from "utils/libs";
import useActaGrado from "../hooks/useActaGrado";

const UpdateActaGrado = () => {
  const { actaGradoId = "" } = useParams<{ actaGradoId: string }>();

  const { actaGrado, isLoadingActaGrado } = useActaGrado({
    actaGradoId,
    options: {
      include: "estudiante,carrera,canton,provincia,estado,modalidad,tipo",
    },
  });

  if (!actaGrado || isLoadingActaGrado) return <Skeleton />;

  const initialValues: IUpdateActaGrado = {
    ...actaGrado,
    numeracion: actaGrado.numero,
    estudiante: actaGrado.estudiante_id,
    canton: actaGrado.canton_id,
    tipo_acta: actaGrado.tipo_acta.codigo,
    aula: actaGrado.aula_id || -1,
    estado_acta: actaGrado.estado_acta_id || -1,
    modalidad_acta_grado: actaGrado.modalidad_acta_grado.codigo,
    duracion: actaGrado.duracion || 60,
  };

  const onSubmit = async (form: any) => {
    console.log({ form });
    await new Promise((r) => setTimeout(r, 1500));
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const handleReset = () => {
    //
  };

  const submitting = formik.isSubmitting;

  return (
    <Stack spacing={2}>
      <TitleNav title="Actualizar acta de grado" goback />

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        onReset={handleReset}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9} md={8}>
            <TextField
              fullWidth
              required
              disabled={true}
              label="Estudiante"
              margin="normal"
              value={getOptionLabelEstudiante(actaGrado.estudiante)}
            />
          </Grid>

          <Grid item xs={12} sm={3} md={4}>
            <TextField
              fullWidth
              required
              disabled={true}
              label="Numeración"
              margin="normal"
              value={actaGrado.numero}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              disabled={true}
              label="Cantón de residencia"
              margin="normal"
              value={getOptionLabelCanton(actaGrado.canton)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              disabled={true}
              margin="normal"
              name="titulo_bachiller"
              label="Título bachiller"
              value={formik.values.titulo_bachiller}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              disabled={true}
              margin="normal"
              name="Fecha inicio estudios"
              label="Título bachiller"
              value={parseToDate(formik.values.fecha_inicio_estudios)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Fecha fin estudios"
              disabled={submitting}
              value={formik.values.fecha_fin_estudios}
              onChange={(date) =>
                formik.setFieldValue("fecha_fin_estudios", date)
              }
              renderInput={(props) => (
                <TextField
                  {...props}
                  margin="normal"
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
              disabled
              margin="normal"
              type="number"
              label="Créditos aprobados"
              value={formik.values.creditos_aprobados}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled={submitting}
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
            <TextField
              required
              fullWidth
              disabled
              margin="normal"
              label="Tipo de acta"
              value={formik.values.tipo_acta}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* <Select
              id="estado_acta"
              name="estado_acta"
              label="Estado acta"
              disabled={submitting}
              items={estadoActas.map((i) => ({
                id: i.id,
                label: i.temp,
              }))}
              value={formik.values.estado_acta}
              onChange={formik.handleChange}
              error={
                formik.touched.estado_acta && Boolean(formik.errors.estado_acta)
              }
              errorMessage={
                formik.touched.estado_acta && formik.errors.estado_acta
              }
            /> */}
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              disabled
              required
              fullWidth
              margin="normal"
              type="number"
              label="Duración (min)"
              value={formik.values.duracion}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              disabled
              margin="normal"
              label="Modalidad acta"
              value={formik.values.modalidad_acta_grado}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            {/* <Box sx={{ display: isONL ? "inline" : "none" }}>
              <Fade in={isONL}>
                <TextField
                  fullWidth
                  margin="normal"
                  id="link"
                  name="link"
                  label="Link"
                  disabled={submitting}
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
                      disabled: submitting,
                      isOptionEqualToValue: isOptionEqualToValueAula,
                      getOptionLabel: getOptionLabelAula,
                    }}
                    TextFieldProps={{
                      label: "Aula",
                      placeholder: "Nombre",
                      disabled: submitting,
                    }}
                  />
                </Box>
              </Fade>
            </Box> */}
          </Grid>

          <Grid item xs={12}>
            <DateTimePicker
              label="Fecha sustentación/incorporación"
              disabled={submitting}
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

          <Grid item xs={12}>
            <Stack>
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
            </Stack>
          </Grid>

          {/* {errorSummary && <ErrorSummary errors={errorSummary} />} */}

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

export default UpdateActaGrado;
