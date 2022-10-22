import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import Icon from "components/Icon";
import TitleNav from "components/TitleNav";
import { GridToolbarColumns } from "components/ToolbarDataGrid";
import { useFilterPagination } from "hooks/useFilterPagination";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { IEstudiante } from "models/interfaces/IEstudiante";
import { Link as RouterLink } from "react-router-dom";
import { getEstudiantes } from "services/estudiantes";

const columns: GridColumns = [
  { field: "cedula", headerName: "Cédula", width: 150 },
  { field: "apellidos", headerName: "Apellidos", flex: 1 },
  { field: "nombres", headerName: "Nombres", flex: 1 },
  { field: "genero", headerName: "Género", width: 80 },
  { field: "fecha_nacimiento", headerName: "F. nacimiento", width: 130 },
  { field: "celular", headerName: "Celular", width: 125 },
  { field: "telefono", headerName: "Teléfono", width: 125 },
  { field: "correo_uta", headerName: "Correo UTA", flex: 1 },
  { field: "correo", headerName: "Correo", flex: 1 },
  { field: "matricula", headerName: "Matrícula" },
  { field: "folio", headerName: "Folio" },
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
        to={`${p.row.id}`}
      />,
    ],
  },
];

const Estudiantes = () => {
  const {
    data,
    handlePageChange,
    handlePageSizeChange,
    loading,
    search,
    setSearch,
  } = useFilterPagination<IEstudiante>({
    fetch: getEstudiantes,
  });

  const { columnVisibilityModel, onColumnVisibilityModelChange } =
    useGridColumnVisibilityModel({
      key: "estudiantesTableModel",
    });

  return (
    <Stack spacing={2}>
      <TitleNav title="Estudiantes" goback={false} />
      <Button
        component={RouterLink}
        startIcon={<Icon icon="add" />}
        to="nuevo"
        variant="outlined"
      >
        AÑADIR ESTUDIANTES
      </Button>

      <TextField
        fullWidth
        margin="normal"
        id="search"
        name="search"
        label="Buscar"
        placeholder="Cédula | Nombres | Apellidos | Matrícula | Folio"
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
    </Stack>
  );
};

export default Estudiantes;
