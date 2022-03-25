import { Button, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ChipStatus from "components/ChipStatus";
import Icon from "components/Icon";
import { useFilterPagination } from "hooks/useFilterPagination";
import { Link as RouterLink, useParams } from "react-router-dom";
import { getPlantillasByProcesoId } from "services/plantillas";

const columns: GridColDef[] = [
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
        field: "id",
        headerName: "Acciones",
        renderCell: (item: GridRenderCellParams) => (
            <>
                <Tooltip title="Ver documento">
                    <IconButton
                        color="primary"
                        component={RouterLink}
                        to={`${item?.value}/drive`}
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
        fetch: getPlantillasByProcesoId,
        filters: {
            proceso: processId,
        },
    });

    return (
        <Stack spacing={2}>
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

export default ListTemplates;
