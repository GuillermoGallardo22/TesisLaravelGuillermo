import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ChipStatus from "components/ChipStatus";
import Icon from "components/Icon";
import TitleNav from "components/TitleNav";
import { useModuleContext } from "contexts/ModuleContext";
import { useFilterPagination } from "hooks/useFilterPagination";
import { ModuleEnum } from "models/enums/Module";
import { IProceso } from "models/interfaces/IProceso";
import ModuleProvider from "providers/ModuleProvider";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { getProcesos } from "services/proceso";

const columns: GridColDef[] = [
  { field: "nombre", headerName: "Nombre", flex: 1 },
  {
    field: "estado",
    headerName: "Estado",
    width: 120,
    renderCell: (item: GridRenderCellParams) => (
      <ChipStatus value={item?.value} />
    ),
  },
  {
    field: "id",
    headerName: "Acciones",
    renderCell: (item: GridRenderCellParams) => (
      <>
        <Tooltip title="Plantillas">
          <IconButton
            color="primary"
            component={RouterLink}
            to={`${item?.value}/plantillas`}
          >
            <Icon icon="article" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Editar">
          <IconButton component={RouterLink} to={`${item.value}`}>
            <Icon icon="edit" />
          </IconButton>
        </Tooltip>
      </>
    ),
  },
];

export const Procesos = () => {
  const { module } = useModuleContext();
  const {
    data,
    handlePageChange,
    handlePageSizeChange,
    loading,
    search,
    setSearch,
  } = useFilterPagination<IProceso>({
    fetch: getProcesos,
    filters: {
      module,
    },
  });

  return (
    <Stack spacing={2}>
      <TitleNav title="Procesos" goback={false} />
      <Button
        component={RouterLink}
        startIcon={<Icon icon="add" />}
        to="nuevo"
        variant="outlined"
      >
        AÑADIR PROCESOS
      </Button>

      <TextField
        fullWidth
        margin="normal"
        id="search"
        name="search"
        label="Buscar"
        placeholder="Nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          pagination
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

export const ProcesosOutlet = () => (
  <ModuleProvider module={ModuleEnum.FACU}>
    <Outlet />
  </ModuleProvider>
);
