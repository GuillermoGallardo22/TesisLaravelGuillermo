import { Button, Stack, TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import { GridToolbarColumns, Icon } from "components";
import { useFilterPagination } from "hooks/useFilterPagination";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { IEstudiante } from "models/interfaces";
import { Link as RouterLink } from "react-router-dom";
import { getEstudiantes } from "services";

const columns: GridColumns = [
    { field: "cedula", headerName: "Cédula", flex: 1 },
    { field: "apellidos", headerName: "Apellidos", flex: 1 },
    { field: "nombres", headerName: "Nombres", flex: 1 },
    { field: "celular", headerName: "Celular", flex: 1 },
    { field: "telefono", headerName: "Teléfono", flex: 1 },
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
                icon={<Icon icon="edit" />}
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
                    onColumnVisibilityModelChange={
                        onColumnVisibilityModelChange
                    }
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
