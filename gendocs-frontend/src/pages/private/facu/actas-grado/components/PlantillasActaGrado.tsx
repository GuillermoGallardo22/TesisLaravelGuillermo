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
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CONSTANTS } from "utils/constants";
import { usePlantillasActaGrado } from "../hooks/usePlantillasActaGrado";
import CeldaNotasDialog from "./CeldaNotasDialog";

const PlantillasActaGrado = () => {
  const { isLoading, plantillas } = usePlantillasActaGrado({
    include: "carreras,estados,estado",
  });

  const [selected, setSelected] = useState<ITipoActaGrado | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const columns = useMemo(
    (): GridColumns => [
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
              color={CONSTANTS.COLORS[te.estado.codigo]}
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
        width: 160,
        headerName: "Calificaciones.",
        getActions: (p: GridRowParams<ITipoActaGrado>) => [
          <GridActionsCellItem
            key="plantilla"
            color="success"
            icon={
              <Tooltip title="Plantilla" arrow>
                <Icon icon="functions" />
              </Tooltip>
            }
            label="Editar"
            LinkComponent={Link}
            to={`drive/${p.row.drive}?type=${GoogleType.SPREADSHEETS}`}
          />,
          <GridActionsCellItem
            key="celdas"
            icon={
              <Tooltip title="Celdas" arrow>
                <Icon icon="moreVert" />
              </Tooltip>
            }
            label="Celdas"
            onClick={() => {
              setSelected(p.row);
              setIsVisible(true);
            }}
          />,
        ],
      },
    ],
    [plantillas.length]
  );

  const onCloseModal = () => {
    setIsVisible(false);
    setSelected(null);
  };

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

      <CeldaNotasDialog
        selected={selected}
        isVisible={isVisible}
        onCloseModal={onCloseModal}
      />
    </Stack>
  );
};

export default PlantillasActaGrado;
