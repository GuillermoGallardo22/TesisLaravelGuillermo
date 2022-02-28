import { Button, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ChipStatus from "components/ChipStatus";
import Icon from "components/Icon";
import IconButton from "components/IconButton";
import { useFilterPagination } from "hooks/useFilterPagination";
import { IProceso } from "models/interfaces";
import { Link as RouterLink } from "react-router-dom";
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
                <IconButton
                    icon="article"
                    color="primary"
                    component={RouterLink}
                    tooltipText="Plantillas"
                    to={`${item?.value}/plantillas`}
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

const ListProcess = () => {
    const {
        data,
        handlePageChange,
        handlePageSizeChange,
        loading,
        search,
        setSearch,
    } = useFilterPagination<IProceso>({
        callback: getProcesos,
    });

    return (
        <Stack spacing={3}>
            <Button
                component={RouterLink}
                startIcon={<Icon icon="add" />}
                to="nuevo"
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

export default ListProcess;
