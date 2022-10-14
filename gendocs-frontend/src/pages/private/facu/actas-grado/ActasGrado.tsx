import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {
  DataGrid,
  GridColumns,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  BooleanCell,
  GridToolbarWithoutExport,
  Icon,
  Select,
  TitleNav,
} from "components";
import { useGridColumnVisibilityModel } from "hooks";
import {
  IAula,
  ICanton,
  IDocente,
  IEstadoActa,
  IEstudiante,
  IModalidadActaGrado,
  ITipoActaGrado,
} from "models/interfaces";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getActasGrado } from "services";
import { parseToDate, parseToDateTime } from "utils";
import { useListCarreras } from "../carreras/hooks/useListCarreras";
import { useEstadoActasList } from "./hooks/useEstadoActasList";
import { useModalidadActasList } from "./hooks/useModalidadActasList";
import { useTipoActasList } from "./hooks/useTipoActasList";

const ActasGrado: React.FunctionComponent = () => {
  const [carrera, setCarrera] = useState(-1);
  const { carreras, isLoading: loadingCarreras } = useListCarreras();
  const { estadoActas, isLoading: loadingEstadoActas } = useEstadoActasList();
  const { modalidades, isLoading: loadingModalidades } =
    useModalidadActasList();
  const { tiposActas, isLoading: loadingTipoActas } = useTipoActasList();

  const { data: actasGrado = [], isLoading: loadingActasGrado } = useQuery(
    ["actas-grado", carrera],
    () =>
      getActasGrado({
        filters: {
          carrera,
        },
      }).then((r) => r.data),
    {
      refetchOnWindowFocus: false,
      enabled: carrera !== -1,
    }
  );

  const columns = useMemo(
    (): GridColumns => [
      {
        type: "number",
        field: "numero",
        headerName: "Número",
      },
      {
        field: "estudiante",
        headerName: "Estudiante",
        flex: 1,
        valueGetter: (e: GridValueGetterParams<IEstudiante>) =>
          e.value!.nombres + " " + e.value!.apellidos,
      },
      {
        field: "titulo_bachiller",
        headerName: "Título bachiller",
        flex: 1,
      },
      {
        type: "date",
        field: "fecha_inicio_estudios",
        headerName: "F.I. estudios",
        valueFormatter: (v: GridValueFormatterParams) => parseToDate(v.value),
      },
      {
        type: "date",
        field: "fecha_fin_estudios",
        headerName: "F.F.estudios",
        valueFormatter: (v: GridValueFormatterParams) => parseToDate(v.value),
      },
      {
        type: "dateTime",
        field: "fecha_presentacion",
        headerName: "F. presen.",
        width: 180,
        valueFormatter: (v: GridValueFormatterParams) =>
          parseToDateTime(v.value),
      },
      {
        type: "number",
        field: "creditos_aprobados",
        headerName: "Créd. apr.",
      },
      {
        type: "number",
        field: "horas_practicas",
        headerName: "Horas prác.",
      },
      {
        field: "presidente",
        headerName: "Presidente",
        flex: 1,
        valueGetter: (e: GridValueGetterParams<IDocente>) =>
          e.value && e.value.nombres,
      },
      {
        field: "canton",
        headerName: "Cantón",
        flex: 1,
        valueGetter: (e: GridValueGetterParams<ICanton>) =>
          e.value!.nombre + " - " + e.value!.provincia.nombre,
      },
      {
        type: "singleSelect",
        field: "tipo_acta",
        headerName: "Tipo acta",
        flex: 1,
        valueGetter: (e: GridValueGetterParams<ITipoActaGrado>) =>
          e.value!.codigo + " | " + e.value!.nombre,
        valueOptions: tiposActas.map((v) => v.codigo + " | " + v.nombre),
      },
      {
        type: "singleSelect",
        field: "estado_acta",
        headerName: "Estado acta",
        width: 130,
        valueGetter: (e: GridValueGetterParams<IEstadoActa>) =>
          e.value!.nombre_mas,
        valueOptions: estadoActas.map((v) => v.nombre_mas),
      },
      {
        type: "singleSelect",
        field: "modalidad_acta_grado",
        headerName: "Mod. acta",
        valueGetter: (e: GridValueGetterParams<IModalidadActaGrado>) =>
          e.value!.nombre,
        valueOptions: modalidades.map((v) => v.nombre),
      },
      {
        field: "link",
        headerName: "Link",
        flex: 1,
        renderCell: (r) => (
          <a
            id={r.value}
            href={r.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            {r.value}
          </a>
        ),
      },
      {
        field: "aula",
        headerName: "Aula",
        flex: 1,
        valueGetter: (e: GridValueGetterParams<IAula>) => e.value?.nombre,
      },
      {
        type: "number",
        field: "duracion",
        headerName: "Duración",
      },
      {
        type: "boolean",
        field: "solicitar_especie",
        headerName: "Sol. especie",
        width: 130,
        renderCell: (r) => <BooleanCell value={r.value} />,
      },
      {
        type: "boolean",
        field: "envio_financiero_especie",
        headerName: "Envío espcie.",
        width: 130,
        renderCell: (r) => <BooleanCell value={r.value} />,
      },
      // {
      //   type: "actions",
      //   field: "acciones",
      //   headerName: "Acciones",
      //   getActions: (p) => [
      //     <GridActionsCellItem
      //       key={p.id}
      //       color="primary"
      //       LinkComponent={Link}
      //       disabled={!p.row.drive}
      //       to={`drive/${p.row.drive}`}
      //       icon={
      //         <Tooltip title="Ver documento" arrow>
      //           <Icon icon="article" />
      //         </Tooltip>
      //       }
      //       label="Ver documento"
      //     />,
      //     <GridActionsCellItem
      //       key={p.id}
      //       color="error"
      //       icon={
      //         <Tooltip title="Eliminar" arrow>
      //           <Icon icon="delete" />
      //         </Tooltip>
      //       }
      //       label="Eliminar documento"
      //       onClick={() => openModal(p.row as IDocumento)}
      //     />,
      //   ],
      // },
    ],
    [estadoActas.length, modalidades.length, tiposActas.length]
  );

  const { columnVisibilityModel, onColumnVisibilityModelChange } =
    useGridColumnVisibilityModel({
      key: "actasGradoTableModel",
    });

  const loading =
    loadingCarreras ||
    loadingActasGrado ||
    loadingEstadoActas ||
    loadingModalidades ||
    loadingTipoActas;

  return (
    <Stack spacing={2}>
      <TitleNav title="Actas de grado" goback={false} />

      <Box>
        <Grid container columns={{ xs: 1, sm: 2 }} spacing={2}>
          <Grid item xs={1}>
            <Button
              fullWidth
              component={Link}
              startIcon={<Icon icon="add" />}
              to="nuevo"
              variant="outlined"
            >
              AÑADIR
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Button
              fullWidth
              component={Link}
              startIcon={<Icon icon="article" />}
              to="plantillas"
              variant="outlined"
            >
              PLANTILLAS
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              id="carreras"
              name="carreras"
              label="Carreras"
              items={carreras.map((c) => ({
                id: c.id,
                label: c.nombre,
              }))}
              value={carrera}
              onChange={(e) => setCarrera(+e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          components={{ Toolbar: GridToolbarWithoutExport }}
          columns={columns}
          loading={loading}
          rows={actasGrado}
        />
      </div>
    </Stack>
  );
};

export default ActasGrado;
