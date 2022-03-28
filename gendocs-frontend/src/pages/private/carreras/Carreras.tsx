import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    GridToolbar,
    GridValueFormatterParams
} from "@mui/x-data-grid";
import { ChipStatus, Icon } from "components";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useListCarreras } from "./hooks/useListCarreras";

export default function Carreras() {
    const { carreras, isLoading } = useListCarreras();

    const columns = useMemo(
        (): GridColumns => [
            {
                field: "nombre",
                headerName: "Nombre",
                flex: 1,
            },
            {
                field: "estado",
                type: "singleSelect",
                headerName: "Estado",
                valueFormatter: (p: GridValueFormatterParams) => {
                    return p.value ? "Activado" : "Desactivado";
                },
                valueOptions: [
                    { value: true, label: "Activado" },
                    { value: false, label: "Desactivado" },
                ],
                renderCell: (p) => <ChipStatus value={p.value} />,
                width: 120,
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
                        to={`${p.row.id}`}
                        icon={<Icon icon="edit" />}
                        label="Editar"
                    />,
                    // <GridActionsCellItem
                    //     key={p.id}
                    //     color="error"
                    //     icon={<Icon icon="delete" />}
                    //     label="Eliminar documento"
                    //     onClick={() => openModal(p.row as IDocumento)}
                    // />,
                ],
            },
        ],
        []
    );

    return (
        <Stack spacing={2}>
            <Button
                component={Link}
                startIcon={<Icon icon="add" />}
                to="nuevo"
                variant="outlined"
            >
                CREAR CARRERA
            </Button>

            <div style={{ height: 700, width: "100%" }}>
                <DataGrid
                    disableColumnMenu
                    // columnVisibilityModel={columnVisibilityModel}
                    // onColumnVisibilityModelChange={
                    //     onColumnVisibilityModelChange
                    // }
                    components={{ Toolbar: GridToolbar }}
                    columns={columns}
                    loading={isLoading}
                    rows={carreras}
                />
            </div>
        </Stack>
    );
}
