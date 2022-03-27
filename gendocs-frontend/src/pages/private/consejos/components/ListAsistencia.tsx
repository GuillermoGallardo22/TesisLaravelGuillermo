import { Button, Stack } from "@mui/material";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import Icon from "components/Icon";
import { GridToolbarColumns } from "components/ToolbarDataGrid";
import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { useMemo } from "react";
import { getNombreCompletoMiembro } from "utils/libs";
import { useMiembros } from "../hooks/useMiembros";
import { AddMiembro } from "./AddMiembro";

export default function ListAsistencia() {
    const { miembros, isLoading, consejo } = useMiembros();

    const columns = useMemo(
        (): GridColumns => [
            {
                field: "miembro",
                headerName: "Nombres",
                flex: 1,
                valueGetter: getNombreCompletoMiembro,
            },
            {
                type: "boolean",
                field: "notificado",
                headerName: "Notificado",
                flex: 1,
            },
            {
                type: "boolean",
                field: "asistira",
                headerName: "Asistirá",
                flex: 1,
            },
            {
                type: "boolean",
                field: "responsable",
                headerName: "Responsable",
                flex: 1,
            },
            {
                type: "actions",
                field: "acciones",
                headerName: "Acciones",
                getActions: (p) => [
                    // <GridActionsCellItem
                    //     key={p.id}
                    //     color="primary"
                    //     LinkComponent={Link}
                    //     disabled={!p.row.drive}
                    //     to={`drive/${p.row.drive}`}
                    //     icon={<Icon icon="article" />}
                    //     label="Ver documento"
                    // />,
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

    const { isVisible, openJustModal, closeModal } = useConfirmationDialog();

    const { columnVisibilityModel, onColumnVisibilityModelChange } =
        useGridColumnVisibilityModel({
            key: "asistentesTableModel",
        });

    return (
        <Stack spacing={2}>
            <Button
                disabled={!consejo}
                startIcon={<Icon icon="add" />}
                variant="outlined"
                onClick={openJustModal}
            >
                AGREGAR MIEMBRO
            </Button>

            <div style={{ height: 700, width: "100%" }}>
                <DataGrid
                    disableColumnMenu
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={
                        onColumnVisibilityModelChange
                    }
                    components={{ Toolbar: GridToolbarColumns }}
                    columns={columns}
                    loading={isLoading}
                    rows={miembros}
                />
            </div>

            {consejo && isVisible && (
                <AddMiembro
                    consejo={consejo}
                    isVisible={isVisible}
                    onCancel={closeModal}
                />
            )}
        </Stack>
    );
}
