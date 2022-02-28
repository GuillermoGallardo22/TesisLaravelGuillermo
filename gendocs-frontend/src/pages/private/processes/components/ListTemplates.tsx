import { Button, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ChipStatus from "components/ChipStatus";
import Icon from "components/Icon";
import IconButton from "components/IconButton";
import { useFilterPagination } from "hooks/useFilterPagination";
import { Link as RouterLink, useParams } from "react-router-dom";
import { getPlantillasByProcesoId } from "services/plantillas";

const columns: GridColDef[] = [
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "autor", headerName: "Autor", flex: 1 },
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
        flex: 1,
        renderCell: (item: GridRenderCellParams) => (
            <>
                <IconButton
                    icon="article"
                    color="primary"
                    component={RouterLink}
                    tooltipText="Ver documento"
                    to={`${item?.value}/drive`}
                />

                <IconButton
                    icon="edit"
                    component={RouterLink}
                    tooltipText="Editar"
                    to={`${item.value}`}
                />
            </>
        ),
    },
];

const ListTemplates = () => {
    const { processId = "" } = useParams<{ processId: string }>();

    const {
        data,
        handlePageChange,
        handlePageSizeChange,
        loading,
        search,
        setSearch,
    } = useFilterPagination({
        callback: getPlantillasByProcesoId,
        filters: {
            proceso: processId,
        },
    });

    return (
        <Stack spacing={3}>
            <Button
                component={RouterLink}
                startIcon={<Icon icon="add" />}
                to="nuevo"
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

export default ListTemplates;
