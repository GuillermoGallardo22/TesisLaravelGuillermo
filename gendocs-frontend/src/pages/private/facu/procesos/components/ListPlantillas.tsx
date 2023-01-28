import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import ChipStatus from "components/ChipStatus";
import Icon from "components/Icon";
import TitleNav from "components/TitleNav";
import { useModuleContext } from "contexts/ModuleContext";
import { useFilterPagination } from "hooks/useFilterPagination";
import { IPlantilla } from "models/interfaces/IPlantilla";
import { Link as RouterLink, useParams } from "react-router-dom";
import { getPlantillasByProcesoId } from "services/plantillas";

const columns: GridColumns = [
  { field: "nombre", headerName: "Nombre", flex: 1 },
  {
    field: "autor",
    headerName: "Autor",
    flex: 1,
    renderCell: (item) => item?.value.name,
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 120,
    renderCell: (item: GridRenderCellParams) => (
      <ChipStatus value={item?.value} />
    ),
  },
  {
    type: "actions",
    field: "acciones",
    headerName: "Acciones",
    width: 200,
    getActions: (item: GridRowParams<IPlantilla>) => [
      <GridActionsCellItem
        key={item.id}
        color="primary"
        LinkComponent={RouterLink}
        to={`${item.row.id}/drive/${item.row.drive}`}
        icon={
          <Tooltip title="Ver documento">
            <Icon icon="article" />
          </Tooltip>
        }
        label="Ver documento"
      />,
      <GridActionsCellItem
        key={item.id}
        color="success"
        LinkComponent={RouterLink}
        to={`${item.row.id}`}
        icon={
          <Tooltip title="Editar">
            <Icon icon="edit" />
          </Tooltip>
        }
        label="Editar"
      />,
    ],
  },
];

const ListPlantillas = () => {
  const { processId = "" } = useParams<{ processId: string }>();
  const { module } = useModuleContext();

  const {
    data,
    handlePageChange,
    handlePageSizeChange,
    loading,
    search,
    setSearch,
  } = useFilterPagination({
    fetch: getPlantillasByProcesoId,
    filters: {
      proceso: processId,
      module,
    },
  });

  return (
    <Stack spacing={2}>
      <TitleNav title="Plantillas" />
      <Button
        component={RouterLink}
        startIcon={<Icon icon="add" />}
        to="nuevo"
        variant="outlined"
      >
        AÑADIR PLANTILLA
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

export default ListPlantillas;
