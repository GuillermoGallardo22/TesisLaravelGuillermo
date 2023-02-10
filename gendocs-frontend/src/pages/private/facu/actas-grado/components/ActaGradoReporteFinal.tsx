import { LoadingButton } from "@mui/lab";
import { Box, Grid, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers";
import Select from "components/Select";
import TitleNav from "components/TitleNav";
import { GridToolbarJustColumnsAndExport } from "components/ToolbarDataGrid";
import { useFormik } from "formik";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { LocalStorageKeys } from "models/enums/LocalStorageKeys";
import { TipoAsistenteActaGradoEnum } from "models/interfaces/IActaGrado";
import { useState } from "react";
import { generarReporteActaGrado } from "services/actas-grado";
import { CONSTANTS } from "utils/constants";
import {
  getFirstMonthDate,
  parseToDateString,
  parseToTimeString,
} from "utils/date";
import { getLocalStoragePreviousValue } from "utils/libs";
import { useListCarreras } from "../../carreras/hooks/useListCarreras";

interface IReporteActaGradoForm {
  carrera: number | string;
  fecha_inicio: Date;
  fecha_fin: Date;
}

interface IReporteActaGrado {
  id: number;
  //   numero: number;
  cedula: string;
  estudiante: string;
  presidente: string;
  modalidad: string;
  tutor: string;
  tema: string;
  miembro1: string;
  miembro2: string;
  suplente1: string;
  suplente2: string;
  fecha: string;
  hora: string;
  lugar: string;
}

const NOW = new Date();

const initialValues: IReporteActaGradoForm = {
  carrera: getLocalStoragePreviousValue(
    LocalStorageKeys.CARRERA_SELECCIONADA_ACTA_GRADO
  ),
  fecha_inicio: getFirstMonthDate(NOW),
  fecha_fin: NOW,
};

const columns = [
  {
    type: "number",
    field: "id",
    headerName: "#",
    width: 75,
  },
  {
    type: "string",
    field: "cedula",
    headerName: "Nro. cédula",
    width: 120,
  },
  {
    type: "string",
    field: "estudiante",
    headerName: "Titulando/a",
    flex: 1,
  },
  {
    type: "string",
    field: "presidente",
    headerName: "Presidente",
    flex: 1,
  },
  {
    type: "string",
    field: "modalidad",
    headerName: "Modalidad de titulacion",
    flex: 1,
  },
  {
    type: "string",
    field: "tutor",
    headerName: "Tutor/a",
    flex: 1,
  },
  {
    type: "string",
    field: "tema",
    headerName: "Tema Trabajo de Titulación",
    flex: 1,
  },
  {
    type: "string",
    field: "miembro1",
    headerName: "Mie. Princ.1",
    flex: 1,
  },
  {
    type: "string",
    field: "miembro2",
    headerName: "Mie. Princ.2",
    flex: 1,
  },
  {
    type: "string",
    field: "suplente1",
    headerName: "Mie. Suplen.1",
    flex: 1,
  },
  {
    type: "string",
    field: "suplente2",
    headerName: "Mie. Suplen.2",
    flex: 1,
  },
  {
    type: "string",
    field: "fecha",
    headerName: "Fecha Grado",
    width: 150,
  },
  {
    type: "string",
    field: "hora",
    headerName: "Hora Grado",
  },
  {
    type: "string",
    field: "lugar",
    headerName: "Lugar",
    flex: 1,
  },
];

const ActaGradoReporte = () => {
  const { carreras } = useListCarreras({
    useQueryOptions: {
      refetchOnWindowFocus: false,
    },
  });

  const [result, setResult] = useState<IReporteActaGrado[]>([]);

  const onSubmit = async (
    form: IReporteActaGradoForm
    // helper: FormikHelpers<IReporteActaGradoForm>
  ) => {
    const { data } = await generarReporteActaGrado({
      queryParams: {
        carrera: form.carrera,
        fi: form.fecha_inicio.toISOString(),
        ff: form.fecha_fin.toISOString(),
      },
    });

    setResult(
      data.map<IReporteActaGrado>((item, index) => {
        const presidente = item.miembros?.find(
          (m) => m.tipo === TipoAsistenteActaGradoEnum.PRESIDENTE
        );

        const tutor = item.miembros?.find(
          (m) => m.tipo === TipoAsistenteActaGradoEnum.TUTOR
        );

        const mp = (item?.miembros || [])
          .filter((m) => m.tipo === TipoAsistenteActaGradoEnum.M_PRINCIPAL)
          .map((m) => m.docente.nombres);

        const ms = (item?.miembros || [])
          .filter((m) => m.tipo === TipoAsistenteActaGradoEnum.M_SUPLENTE)
          .map((m) => m.docente.nombres);

        return {
          id: index + 1,
          cedula: item.estudiante.cedula,
          estudiante: item.estudiante.nombres + " " + item.estudiante.apellidos,
          presidente: presidente?.docente.nombres || "",
          modalidad: item.tipo?.nombre || "",
          tutor: tutor?.docente.nombres || "",
          tema: item?.tema || "",
          miembro1: mp[0] || "",
          miembro2: mp[1] || "",
          suplente1: ms[0] || "",
          suplente2: ms[1] || "",
          fecha: parseToDateString(item.fecha_presentacion),
          hora: parseToTimeString(item.fecha_presentacion),
          lugar: item.aula?.nombre || "",
        };
      })
    );
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const submitting = formik.isSubmitting;

  const { columnVisibilityModel, onColumnVisibilityModelChange } =
    useGridColumnVisibilityModel({
      key: "reporteActasGradoTableModel",
    });

  return (
    <Stack spacing={2}>
      <TitleNav title="Reporte actas de grado Final" />

      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        noValidate
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Select
              id="carrera"
              name="carrera"
              label="Carreras"
              disabled={submitting}
              items={carreras.map((c) => ({
                id: c.id,
                label: c.nombre,
              }))}
              value={formik.values.carrera}
              onChange={formik.handleChange}
              error={formik.touched.carrera && Boolean(formik.errors.carrera)}
              errorMessage={formik.touched.carrera && formik.errors.carrera}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <DatePicker
              views={CONSTANTS.DATEPICKER}
              disabled={submitting}
              label="Fecha inicio"
              value={formik.values.fecha_inicio}
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
                    formik.touched.fecha_fin && Boolean(formik.errors.fecha_fin)
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

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          components={{ Toolbar: GridToolbarJustColumnsAndExport }}
          columns={columns}
          loading={submitting}
          rows={result}
        />
      </div>

      {/* <pre>
        {JSON.stringify(
          {
            items: result.map((i: any) => ({
              numero: i.numero,
              fecha_presentacion: i.fecha_presentacion,
            })),
            total: result.length,
          },
          null,
          2
        )}
      </pre> */}
    </Stack>
  );
};
export default ActaGradoReporte;
