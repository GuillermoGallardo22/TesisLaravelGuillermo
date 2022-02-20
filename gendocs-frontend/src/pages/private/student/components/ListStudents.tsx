import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useFilterPagination } from "hooks/useFilterPagination";
import { IEstudiante } from "models/interfaces";
import { Link as RouterLink } from "react-router-dom";
import { getEstudiantes } from "services/estudiantes";

const columns: GridColDef[] = [
    { field: "cedula", headerName: "Cédula", width: 110 },
    { field: "apellidos", headerName: "Apellidos", width: 250 },
    { field: "nombres", headerName: "Nombres", width: 250 },
    { field: "celular", headerName: "Celular", width: 110 },
    { field: "telefono", headerName: "Teléfono", width: 110 },
    { field: "correo_uta", headerName: "Correo UTA", width: 250 },
    { field: "correo", headerName: "Correo", width: 250 },
    { field: "matricula", headerName: "Matrícula", width: 100 },
    { field: "folio", headerName: "Folio", width: 100 },
    {
        field: "id",
        headerName: "Acciones",
        renderCell: (item: GridRenderCellParams) => (
            <IconButton
                color="primary"
                component={RouterLink}
                to={`${item.value}`}
            >
                <EditIcon />
            </IconButton>
        ),
    },
];

const ListStudents = () => {
    const {
        data,
        handlePageChange,
        handlePageSizeChange,
        loading,
        search,
        setSearch,
    } = useFilterPagination<IEstudiante>({
        callback: getEstudiantes,
    });

    return (
        <Stack spacing={2}>
            <Button component={RouterLink} startIcon={<AddIcon />} to="nuevo">
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

export default ListStudents;
