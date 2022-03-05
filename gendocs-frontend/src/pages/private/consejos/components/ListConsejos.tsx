import { Stack, Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Icon from "components/Icon";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "fecha", headerName: "Fecha", flex: 1 },
    { field: "tipo", headerName: "Tipo", flex: 1 },
    // { field: "estado", headerName: "Estado", flex: 1 },
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
    return (
        <Stack spacing={3}>
            <Button component={Link} startIcon={<Icon icon="add" />} to="nuevo">
                AÑADIR CONSEJO
            </Button>
            {/* 
            <TextField
                fullWidth
                margin="normal"
                id="search"
                name="search"
                label="Buscar"
                placeholder="Nombre"
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
            /> */}

            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    pagination
                    paginationMode="server"
                    // onPageSizeChange={handlePageSizeChange}
                    // onPageChange={handlePageChange}
                    //
                    columns={columns}
                    // loading={loading}
                    //
                    rows={[]}
                    // page={data.meta.current_page}
                    // pageSize={data.meta.per_page}
                    // rowCount={data.meta.total}
                />
            </div>
        </Stack>
    );
}
