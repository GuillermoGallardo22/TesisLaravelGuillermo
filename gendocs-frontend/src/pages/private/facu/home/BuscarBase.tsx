import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import Icon from "components/Icon";
import TitleNav from "components/TitleNav";
import { GridToolbarColumns } from "components/ToolbarDataGrid";
import { useModuleContext } from "contexts/ModuleContext";
import { useFilterPagination } from "hooks/useFilterPagination";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { IDocumento } from "models/interfaces/IDocumento";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { filterDocumentos } from "services/documentos";
import {
  getAutor,
  getConsejo,
  getCreado,
  getNombreCompleto,
  getPlantilla,
  getProceso,
} from "utils/libs";

const Home = () => {
  const { module } = useModuleContext();

  const {
    data,
    handlePageChange,
    handlePageSizeChange,
    loading,
    search,
    setSearch,
  } = useFilterPagination<IDocumento>({
    fetch: filterDocumentos,
    key: "estudiante",
    filters: {
      module,
    },
  });

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
        field: "consejo",
        headerName: "Consejo",
        flex: 1,
        valueGetter: getConsejo,
      },
      {
        field: "descripcion",
        headerName: "Descripción",
        flex: 1,
      },
      {
        field: "autor",
        headerName: "Autor",
        valueGetter: getAutor,
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
      key: "buscar-resoluciones",
    });

  return (
    <Stack spacing={2}>
      <TitleNav title="Consulta de documentos" goback={false} />

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

export default Home;
