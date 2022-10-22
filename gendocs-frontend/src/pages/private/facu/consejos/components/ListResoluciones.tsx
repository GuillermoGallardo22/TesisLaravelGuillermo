import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import Icon from "components/Icon";
import TitleNav from "components/TitleNav";
import { GridToolbarWithoutExport } from "components/ToolbarDataGrid";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { useListDocumentos } from "pages/private/facu/documentos/hooks/useListDocumentos";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getAutor,
  getCreado,
  getNombreCompleto,
  getPlantilla,
  getProceso,
} from "utils/libs";

const ListResoluciones: React.FunctionComponent = () => {
  const { consejoId = "-1" } = useParams<{ consejoId: string }>();

  const { documentos, loading } = useListDocumentos(Number(consejoId));

  const columns = useMemo(
    (): GridColumns => [
      {
        type: "number",
        field: "numero",
        headerName: "Número",
      },
      {
        field: "destinatario",
        headerName: "Destinatario",
        flex: 1.5,
        valueGetter: getNombreCompleto,
      },
      {
        field: "plantilla",
        headerName: "Plantilla",
        valueGetter: getPlantilla,
        flex: 1,
      },
      {
        field: "proceso",
        headerName: "Proceso",
        valueGetter: getProceso,
        flex: 1,
      },
      {
        field: "autor",
        headerName: "Autor",
        valueGetter: getAutor,
        flex: 1,
      },
      {
        field: "descripcion",
        headerName: "Descripción",
        flex: 1,
      },
      {
        type: "dateTime",
        field: "creado",
        headerName: "F. creación",
        valueFormatter: getCreado,
        flex: 1,
      },
      {
        type: "actions",
        field: "acciones",
        headerName: "Acciones",
        getActions: (p) => [
          <GridActionsCellItem
            key={p.id}
            color="primary"
            LinkComponent={Link}
            disabled={!p.row.drive}
            to={`drive/${p.row.drive}`}
            icon={
              <Tooltip title="Ver documento" arrow>
                <Icon icon="article" />
              </Tooltip>
            }
            label="Ver documento"
          />,
        ],
      },
    ],
    []
  );

  const { columnVisibilityModel, onColumnVisibilityModelChange } =
    useGridColumnVisibilityModel({
      key: "consejo-resoluciones",
    });

  return (
    <Stack spacing={2}>
      <TitleNav title="Documentos" />
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          //   disableColumnMenu
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          components={{ Toolbar: GridToolbarWithoutExport }}
          columns={columns}
          loading={loading}
          rows={documentos}
        />
      </div>
    </Stack>
  );
};

export default ListResoluciones;
