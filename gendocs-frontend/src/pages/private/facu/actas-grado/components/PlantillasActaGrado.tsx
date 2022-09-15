import Tooltip from "@mui/material/Tooltip";
import { Box, Chip } from "@mui/material";
import Stack from "@mui/material/Stack";
import {
  DataGrid,
  GridActionsCellItem,
  gridClasses,
  GridColumns,
  GridRenderCellParams,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { GridToolbarWithoutExport, Icon, TitleNav } from "components";
import { ICarrera, ITipoActaGrado } from "models/interfaces";
import { usePlantillasActaGrado } from "../hooks/usePlantillasActaGrado";
import { Link } from "react-router-dom";

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
    field: "acciones",
    headerName: "Acciones",
    getActions: (p: GridRowParams<ITipoActaGrado>) => [
      <GridActionsCellItem
        key={p.id}
        color="primary"
        icon={
          <Tooltip title="Plantilla" arrow>
            <Icon icon="article" />
          </Tooltip>
        }
        label="Editar"
        LinkComponent={Link}
        to={`drive/${p.row.drive}`}
      />,
    ],
  },
];

const PlantillasActaGrado = () => {
  const { isLoading, plantillas } = usePlantillasActaGrado();

  return (
    <Stack spacing={2}>
      <TitleNav title="Carreras" />
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
