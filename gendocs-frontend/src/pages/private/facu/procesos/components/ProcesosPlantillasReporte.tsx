import { LoadingButton } from "@mui/lab";
import { Box, Grid, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { SingleAutoComplete } from "components/SingleAutoComplete";
import TitleNav from "components/TitleNav";
import { useModuleContext } from "contexts/ModuleContext";
import { IProceso } from "models/interfaces/IProceso";
import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { getProcesos } from "services/proceso";
import { CONSTANTS } from "utils/constants";
import { getOptionLabelProceso, isOptionEqualToValueProceso } from "utils/libs";
import { useProcesosPlantillasReporte } from "../hooks/useProcesosPlantillasReporte";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  ChartDataLabels
);

const title = "Reporte procesos/plantillas";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      //   position: "top" as const,
    },
    title: {
      // display: true,
      // text: title,
    },
    colors: {
      forceOverride: true,
    },
  },
};

const ProcesosPlantillasReporte = () => {
  const { module } = useModuleContext();

  const [acProceso, setACProceso] = useState<IProceso | null>(null);
  const {
    formik,
    result,
    handleReset: handleResetForm,
  } = useProcesosPlantillasReporte(module);

  useEffect(() => {
    if (!acProceso) {
      formik.setFieldValue("proceso", -1);
      return;
    }

    formik.setFieldValue("proceso", acProceso.id);
  }, [acProceso]);

  const handleReset = () => {
    handleResetForm();
    setACProceso(null);
  };

  const submitting = formik.isSubmitting;

  const data = useMemo(() => {
    const labels = result.map((r) => r.nombre);

    let datasets: { label: string; data: number[] }[] = [];
    if (acProceso) {
      datasets = [
        {
          label: acProceso.nombre,
          data: result.map((r) => r.total),
        },
      ];
    }

    return {
      datasets,
      labels,
    };
  }, [result]);

  return (
    <Stack spacing={2}>
      <TitleNav title={title} />

      <Stack spacing={4}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          onReset={handleReset}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SingleAutoComplete
                key="autocomplete-procesos"
                value={acProceso}
                onChange={setACProceso}
                hookProps={{
                  fetch: getProcesos,
                  filters: {
                    module,
                  },
                }}
                AutoCompleteProps={{
                  id: "autocomplete-procesos",
                  disabled: submitting,
                  isOptionEqualToValue: isOptionEqualToValueProceso,
                  getOptionLabel: getOptionLabelProceso,
                }}
                TextFieldProps={{
                  label: "Proceso",
                  required: true,
                  error:
                    formik.touched.proceso && Boolean(formik.errors.proceso),
                  helperText: formik.touched.proceso && formik.errors.proceso,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <DatePicker
                views={CONSTANTS.DATEPICKER}
                disabled={submitting}
                label="Fecha inicio"
                value={formik.values.fecha_inicio}
                maxDate={formik.values.fecha_fin}
                onChange={(date) => {
                  formik.setFieldValue("fecha_inicio", date);
                }}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    margin="normal"
                    required
                    fullWidth
                    error={
                      formik.touched.fecha_inicio &&
                      Boolean(formik.errors.fecha_inicio)
                    }
                    helperText={
                      formik.touched.fecha_inicio && formik.errors.fecha_inicio
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <DatePicker
                views={CONSTANTS.DATEPICKER}
                disabled={submitting}
                label="Fecha fin"
                value={formik.values.fecha_fin}
                minDate={formik.values.fecha_inicio}
                onChange={(date) => {
                  formik.setFieldValue("fecha_fin", date);
                }}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    margin="normal"
                    required
                    fullWidth
                    error={
                      formik.touched.fecha_fin &&
                      Boolean(formik.errors.fecha_fin)
                    }
                    helperText={
                      formik.touched.fecha_fin && formik.errors.fecha_fin
                    }
                  />
                )}
              />
            </Grid>

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
                Generar
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Bar height={125} options={options} data={data} />
        </Box>
      </Stack>
    </Stack>
  );
};

export default ProcesosPlantillasReporte;
