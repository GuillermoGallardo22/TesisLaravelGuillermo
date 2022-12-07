import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridActionsCellItem,
  gridClasses,
  GridColumns,
  GridRenderCellParams,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import Icon from "components/Icon";
import TitleNav from "components/TitleNav";
import { GridToolbarWithoutExport } from "components/ToolbarDataGrid";
import { GoogleType } from "models/enums/GoogleType";
import { ITipoActaGrado } from "models/interfaces/IActaGrado";
import { ICarrera } from "models/interfaces/ICarrera";
import { Link } from "react-router-dom";
import { usePlantillasActaGrado } from "../hooks/usePlantillasActaGrado";

const Colors = {
  APRO: "primary",
  REPR: "error",
  NO_RESENTACION: "warning",
};

const columns: GridColumns = [
  {
    field: "codigo",
    headerName: "Código",
  },
  {
    field: "nombre",
    headerName: "Nombre",
    flex: 1,
  },
  {
    field: "carreras",
    headerName: "Carreras",
    flex: 2,
    valueGetter: (param: GridValueGetterParams<ICarrera[]>) =>
      param.value?.map((c) => c.nombre),
    renderCell: (item: GridRenderCellParams<string[]>) => (
      <Box display={"grid"} gap={1}>
        {(item?.value || []).map((c, i) => (
          <Chip key={i} label={c} size="small" />
        ))}
      </Box>
    ),
  },
  {
    type: "actions",
    field: "plantillas",
    width: 200,
    headerName: "Plantillas.",
    getActions: (p: GridRowParams<ITipoActaGrado>) =>
      p.row.estados.map((te) => (
        <GridActionsCellItem
          key={te.id}
          color={Colors[te.estado.codigo]}
          icon={
            <Tooltip title={te.estado.nombre_mas} arrow>
              <Icon icon="article" />
            </Tooltip>
          }
          label="Editar"
          LinkComponent={Link}
          to={`drive/${te.drive}`}
        />
      )),
  },
  {
    type: "actions",
    field: "acciones",
    headerName: "Calif.",
    getActions: (p: GridRowParams<ITipoActaGrado>) => [
      <GridActionsCellItem
        key={p.id}
        color="success"
        icon={
          <Tooltip title="Calif." arrow>
            <Icon icon="functions" />
          </Tooltip>
        }
        label="Editar"
        LinkComponent={Link}
        to={`drive/${p.row.drive}?type=${GoogleType.SPREADSHEETS}`}
      />,
    ],
  },
];

const PlantillasActaGrado = () => {
  const { isLoading, plantillas } = usePlantillasActaGrado();

  return (
    <Stack spacing={2}>
      <TitleNav title="Plantillas acta grado" />
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          getRowHeight={() => "auto"}
          sx={{
            [`& .${gridClasses.cell}`]: {
              py: 1,
            },
          }}
          disableColumnMenu
          components={{ Toolbar: GridToolbarWithoutExport }}
          columns={columns}
          loading={isLoading}
          rows={plantillas}
        />
      </div>
    </Stack>
  );
};

export default PlantillasActaGrado;
