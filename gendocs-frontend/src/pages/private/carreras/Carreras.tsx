import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import {
  ChipStatus,
  GridToolbarWithoutExport,
  Icon,
  TitleNav,
} from "components";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useListCarreras } from "./hooks/useListCarreras";

export default function Carreras() {
  const { carreras, isLoading } = useListCarreras();

  const columns = useMemo(
    (): GridColumns => [
      {
        field: "nombre",
        headerName: "Nombre",
        flex: 1,
      },
      {
        field: "estado",
        type: "singleSelect",
        headerName: "Estado",
        valueFormatter: (p: GridValueFormatterParams) => {
          return p.value ? "Activado" : "Desactivado";
        },
        valueOptions: [
          { value: true, label: "Activado" },
          { value: false, label: "Desactivado" },
        ],
        renderCell: (p) => <ChipStatus value={p.value} />,
        width: 120,
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
            to={`${p.row.id}`}
            icon={
              <Tooltip title="Editar" arrow>
                <Icon icon="edit" />
              </Tooltip>
            }
            label="Editar"
          />,
        ],
      },
    ],
    []
  );

  return (
    <Stack spacing={2}>
      <TitleNav title="Carreras" goback={false} />
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          // columnVisibilityModel={columnVisibilityModel}
          // onColumnVisibilityModelChange={
          //     onColumnVisibilityModelChange
          // }
          components={{ Toolbar: GridToolbarWithoutExport }}
          columns={columns}
          loading={isLoading}
          rows={carreras}
        />
      </div>
    </Stack>
  );
}
