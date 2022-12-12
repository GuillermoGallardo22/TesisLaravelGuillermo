import LoadingButton from "@mui/lab/LoadingButton";
import { Fade } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import ErrorSummary from "components/ErrorSummary";
import Select from "components/Select";
import { SingleAutoComplete } from "components/SingleAutoComplete";
import Skeleton from "components/Skeleton";
import TitleNav from "components/TitleNav";
import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { Genero } from "models/enums/Genero";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { ModalidadActaGrado } from "models/enums/ModalidadActaGrado";
import {
  IActaGrado,
  IEstadoActa,
  ITipoActaGrado,
  IUpdateActaGrado,
} from "models/interfaces/IActaGrado";
import { IAula } from "models/interfaces/IAula";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateActaGrado } from "services/actas-grado";
import { getAulas } from "services/aulas";
import { getTipoActasGrado } from "services/tipoActasGrado";
import { parseToDate } from "utils/date";
import {
  getOptionLabelAula,
  getOptionLabelCanton,
  getOptionLabelEstudiante,
  isOptionEqualToValueAula,
} from "utils/libs";
import useActaGrado from "../hooks/useActaGrado";
import { testFechaSustentacion } from "utils/libs";
import { VALIDATION_MESSAGES as VM } from "utils/messages";
import * as yup from "yup";

const UpdateActaGrado = () => {
  const { actaGradoId = "" } = useParams();

  const [loading, setLoading] = useState(true);

  const [tipoActasGrado, setTipoActasGrado] = useState<ITipoActaGrado[]>([]);

  const { actaGrado, isLoadingActaGrado } = useActaGrado({
    actaGradoId,
    options: {
      include: "aula,estudiante,carrera,canton,provincia,estado,modalidad,tipo",
    },
  });

  useEffect(() => {
    if (!actaGrado) {
      return;
    }

    setLoading(true);

    Promise.all([
      getTipoActasGrado({
        filters: {
          carrera: actaGrado.estudiante.carrera.id,
        },
      }),
      // getModalidadesActaGrado(),
    ])
      .then((r) => {
        const [_tiposActasGrado] = r;

        setTipoActasGrado(_tiposActasGrado);

        // setModalidades(modalidades);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [actaGrado]);

  if (!actaGrado || isLoadingActaGrado || loading) return <Skeleton />;

  return (
    <UpdateActaGradoBase
      actaGrado={actaGrado}
      tipoActasGrado={tipoActasGrado}
    />
  );
};

const renderCount = 1;
const TODAY = new Date();

const validationSchema = yup.object().shape({
  fecha_fin_estudios: yup
    .date()
    .nullable()
    .min(yup.ref("fecha_inicio_estudios"), VM.invalidDate),
  fecha_presentacion: yup.date().min(TODAY, VM.invalidDate).nullable(),
  horas_practicas: yup.number(),
  estado_acta: yup.number().nullable(),
  solicitar_especie: yup.boolean(),
  envio_financiero_especie: yup.boolean(),
  link: yup
    .string()
    .nullable()
    .test("invalid-link", VM.fechaSusReq, testFechaSustentacion),
  aula: yup
    .number()
    .nullable()
    .test("invalid-aula", VM.fechaSusReq, testFechaSustentacion),
  duracion: yup.number().required(VM.required).min(1, VM.invalidOption),
});

const UpdateActaGradoBase = ({
  actaGrado,
  // modalidades,
  tipoActasGrado,
}: {
  actaGrado: IActaGrado;
  // modalidades: IModalidadActaGrado[];
  tipoActasGrado: ITipoActaGrado[];
}) => {
  const [acAula, setACAula] = useState<IAula | null>(actaGrado.aula || null);
  const [estadoActas, setEstadoActas] = useState<IEstadoActa[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const { errorSummary, setErrorSummary } = useErrorsResponse();

  const initialValues: IUpdateActaGrado = {
    ...actaGrado,
    fecha_inicio_estudios: new Date(actaGrado.fecha_inicio_estudios),
    numeracion: actaGrado.numero,
    estudiante: actaGrado.estudiante_id,
    canton: actaGrado.canton_id,
    tipo_acta: actaGrado.tipo_acta.codigo,
    aula: actaGrado.aula_id || -1,
    estado_acta: actaGrado.estado_acta_id || -1,
    modalidad_acta_grado: actaGrado.modalidad_acta_grado.codigo,
    duracion: actaGrado.duracion || 60,
    envio_financiero_especie: Boolean(actaGrado.envio_financiero_especie),
    solicitar_especie: Boolean(actaGrado.solicitar_especie),
    link: actaGrado?.link || "",
  };

  const onSubmit = async (form: IUpdateActaGrado) => {
    setErrorSummary(undefined);

    const result = await updateActaGrado(form);

    if (result.status === HTTP_STATUS.ok) {
      enqueueSnackbar(result.message, { variant: "success" });
      // handleReset();
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setErrorSummary(result.errors);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    enableReinitialize: true,
    validationSchema,
  });

  const handleReset = () => {
    //
  };

  useEffect(() => {
    formik.setFieldValue("aula", acAula?.id || -1);
  }, [acAula]);

  useEffect(() => {
    if (renderCount !== 1) {
      formik.setFieldValue("estado_acta", -1);
    }

    const tipoActaSeleccionada = tipoActasGrado.find(
      (i) => i.codigo == formik.values.tipo_acta
    );

    const estados = tipoActaSeleccionada?.estados || [];
    const isFem = actaGrado.estudiante.genero === Genero.FEMENINO;

    setEstadoActas(
      estados.map((i) => ({
        ...i.estado,
        temp: isFem ? i.estado.nombre_fem : i.estado.nombre_mas,
      }))
    );
  }, [formik.values.tipo_acta]);

  const isPRE =
    actaGrado.modalidad_acta_grado.codigo === ModalidadActaGrado.PRE;
  const isONL =
    actaGrado.modalidad_acta_grado.codigo === ModalidadActaGrado.ONL;

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
              name="fecha_inicio_estudios"
              label="Fecha inicio estudios"
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
              value={
                tipoActasGrado.find(
                  (ta) => ta.codigo === formik.values.tipo_acta
                )?.nombre
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Select
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
            />
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
              value={actaGrado.modalidad_acta_grado.nombre}
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
            </Box>
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

export default UpdateActaGrado;
