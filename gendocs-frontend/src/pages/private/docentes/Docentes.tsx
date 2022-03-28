import { Button, Stack } from "@mui/material";
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    GridToolbar,
} from "@mui/x-data-grid";
import { Icon } from "components";
import { useGridColumnVisibilityModel } from "hooks";
import { Link as RouterLink } from "react-router-dom";
import { useListDocentes } from "./hooks/useListDocentes";

const columns: GridColumns = [
    { field: "cedula", headerName: "Cédula", flex: 1 },
    { field: "nombres", headerName: "Nombres", flex: 1 },
    { field: "celular", headerName: "Celular", flex: 1 },
    { field: "telefono", headerName: "Teléfono", flex: 1 },
    { field: "correo_uta", headerName: "Correo UTA", flex: 1 },
    { field: "correo", headerName: "Correo", flex: 1 },
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
                to={p.row.id + ""}
            />,
        ],
    },
];

const Docentes = () => {
    const { docentes, isLoading } = useListDocentes();

    const { columnVisibilityModel, onColumnVisibilityModelChange } =
        useGridColumnVisibilityModel({
            key: "docentesTableModel",
        });

    return (
        <Stack spacing={2}>
            <Button
                component={RouterLink}
                startIcon={<Icon icon="add" />}
                to="nuevo"
                variant="outlined"
            >
                AÑADIR DOCENTE
            </Button>

            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    disableColumnMenu
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={
                        onColumnVisibilityModelChange
                    }
                    components={{ Toolbar: GridToolbar }}
                    columns={columns}
                    loading={isLoading}
                    rows={docentes}
                />
            </div>
        </Stack>
    );
};

export default Docentes;
