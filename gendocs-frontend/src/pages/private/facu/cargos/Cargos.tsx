import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import { GridToolbarWithoutExport, Icon, TitleNav } from "components";
import { useGridColumnVisibilityModel } from "hooks";
import { Link as RouterLink } from "react-router-dom";
import { useListCargos } from "./hooks/useListCargos";

const columns: GridColumns = [
  { field: "nombre", headerName: "Nombre", flex: 1 },
  { field: "variable", headerName: "Variable", flex: 1 },
  {
    field: "docente",
    headerName: "Docente",
    flex: 2,
    valueGetter: (item) => item?.value?.nombres || "",
  },
  {
    type: "actions",
    field: "acciones",
    headerName: "Acciones",
    getActions: (p) => [
      <GridActionsCellItem
        key={p.id}
        color="primary"
        icon={
          <Tooltip title="Editar" arrow>
            <Icon icon="edit" />
          </Tooltip>
        }
        label="Editar"
        LinkComponent={RouterLink}
        to={p.row.id + ""}
      />,
    ],
  },
];

const Cargos = () => {
  const { cargos, isLoading } = useListCargos();

  const { columnVisibilityModel, onColumnVisibilityModelChange } =
    useGridColumnVisibilityModel({
      key: "table-cargos",
    });

  return (
    <Stack spacing={2}>
      <TitleNav title="Cargos" goback={false} />
      <Button
        component={RouterLink}
        startIcon={<Icon icon="add" />}
        to="nuevo"
        variant="outlined"
      >
        AÑADIR CARGO
      </Button>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          components={{ Toolbar: GridToolbarWithoutExport }}
          columns={columns}
          loading={isLoading}
          rows={cargos}
        />
      </div>
    </Stack>
  );
};

export default Cargos;
