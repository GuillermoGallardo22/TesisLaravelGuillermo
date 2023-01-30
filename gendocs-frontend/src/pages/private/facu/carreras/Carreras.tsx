import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import ChipStatus from "components/ChipStatus";
import Icon from "components/Icon";
import TitleNav from "components/TitleNav";
import { GridToolbarWithoutExport } from "components/ToolbarDataGrid";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
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
        field: "titulo_mas",
        headerName: "Título (M)",
        flex: 1,
      },
      {
        field: "titulo_fem",
        headerName: "Título (F)",
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
      // {
      //   field: "desaparecera",
      //   type: "singleSelect",
      //   headerName: "Es Titulación",
      //   valueFormatter: (p: GridValueFormatterParams) => {
      //     return p.value ? "Si" : "No";
      //   },
      //   valueOptions: [
      //     { value: true, label: "Si" },
      //     { value: false, label: "No" },
      //   ],
      //   renderCell: (p) => <ChipStatus value={p.value} />,
      //   width: 120,
      // },

      {
        field: "desaparecera",
        headerName: "Es Titulación",
        renderCell: (item) => (
          <ChipStatus
            value={item.value}
            textPrimary="Si"
            textSecondary="No"
            // colorSecondary="success"
          />
        ),
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
      <Button
        component={Link}
        startIcon={<Icon icon="add" />}
        to="nuevo"
        variant="outlined"
      >
        CREAR CARRERA
      </Button>

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
