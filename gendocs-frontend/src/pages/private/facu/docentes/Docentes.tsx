import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import Icon from "components/Icon";
import TitleNav from "components/TitleNav";
import { GridToolbarColumns, GridToolbarWithoutExport } from "components/ToolbarDataGrid";
import { useFilterPagination } from "hooks/useFilterPagination";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { IDocente } from "models/interfaces/IDocente";
import { Link as RouterLink } from "react-router-dom";
import { getDocentesTabla } from "services/docentes";
import { useListDocentes } from "./hooks/useListDocentes";

const columns: GridColumns = [
  { field: "cedula", headerName: "Cédula", flex: 1 },
  { field: "nombres", headerName: "Nombres", flex: 1 },
  { field: "celular", headerName: "Celular", flex: 1 },
  { field: "telefono", headerName: "Teléfono", flex: 1 },
  { field: "correo_uta", headerName: "Correo UTA", flex: 1 },
  { field: "correo", headerName: "Correo", flex: 1 },
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

// const Docentes = () => {
//   const { docentes,
//     search,
//     setSearch,
//     isLoading } = useListDocentes();

const Docentes = () => {
  const {
    data,
    handlePageChange,
    handlePageSizeChange,
    loading,
    search,
    setSearch,
  } = useFilterPagination<IDocente>({
    fetch: getDocentesTabla,
  }); 

  const { columnVisibilityModel, onColumnVisibilityModelChange } =
    useGridColumnVisibilityModel({
      key: "docentesTableModel",
    });

  return (
    <Stack spacing={2}>
      <TitleNav title="Funcionario" goback={false} />
      <Button
        component={RouterLink}
        startIcon={<Icon icon="add" />}
        to="nuevo"
        variant="outlined"
      >
        AÑADIR FUNCIONARIO
      </Button>

      
      <TextField
        fullWidth
        margin="normal"
        id="search"
        name="search"
        label="Buscar"
        placeholder="Cédula | Nombres "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          pagination
          components={{
            Toolbar: GridToolbarColumns,
          }}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          paginationMode="server"
          onPageSizeChange={handlePageSizeChange}
          onPageChange={handlePageChange}
          //
          columns={columns}
          loading={loading}
          //
          rows={data.data}
          page={data.meta.current_page}
          pageSize={data.meta.per_page}
          rowCount={data.meta.total}
        />
      </div>
      {/* <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          components={{ Toolbar: GridToolbarWithoutExport }}
          columns={columns}
          loading={isLoading}
          rows={docentes}
        />
      </div> */}
    </Stack>
  );
};

export default Docentes;
