import { Button, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ChipStatus from "components/ChipStatus";
import Icon from "components/Icon";
import { useFilterPagination } from "hooks/useFilterPagination";
import { Link } from "react-router-dom";
import { getConsejos } from "services/consejos";
import { format } from "date-fns";

const columns: GridColDef[] = [
    { field: "nombre", headerName: "Nombre", flex: 1 },
    {
        field: "fecha",
        headerName: "Fecha",
        flex: 1,
        renderCell: (item) => format(new Date(item.value), "dd/MM/yyyy p"),
        // renderCell: (item) => item.value.toDateString(),
    },
    {
        field: "tipo_consejo",
        headerName: "Tipo",
        renderCell: (item) => item.value.nombre,
    },
    {
        field: "estado",
        headerName: "Estado",
        renderCell: (item) => (
            <ChipStatus
                value={item.value}
                textPrimary="Abierta"
                textSecondary="Cerrada"
                colorSecondary="success"
            />
        ),
    },
    {
        field: "id",
        headerName: "Acciones",
        renderCell: (item) => (
            <></>
            // <IconButton
            //     color="primary"
            //     component={RouterLink}
            //     to={item.value + ""}
            // >
            //     <Icon icon="edit" />
            // </IconButton>
        ),
    },
];

export default function ListConsejos() {
    const {
        data,
        handlePageChange,
        handlePageSizeChange,
        loading,
        search,
        setSearch,
    } = useFilterPagination({
        callback: getConsejos,
    });

    console.log({ data });

    return (
        <Stack spacing={3}>
            <Button component={Link} startIcon={<Icon icon="add" />} to="nuevo">
                AÑADIR CONSEJO
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
}
