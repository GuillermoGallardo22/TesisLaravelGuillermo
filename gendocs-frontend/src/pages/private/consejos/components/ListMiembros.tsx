import { Button, DialogContentText, Stack } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import { ConfirmationDialog, GridToolbarColumns, Icon } from "components";
import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useDeleteItem } from "hooks/useDeleteItem";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { IMiembro } from "models/interfaces";
import { useMemo } from "react";
import { useQueryClient } from "react-query";
import { deleteMiembro } from "services/miembros";
import { getNombreCompletoMiembro } from "utils/libs";
import { useMiembros } from "../hooks/useMiembros";
import { AddMiembro } from "./AddMiembro";

export default function ListMiembros() {
    const { miembros, isLoading, consejo } = useMiembros();
    const client = useQueryClient();

    const {
        isVisible: isVisibleDeleteMiembroModal,
        openModal: openDeleteMiembroModal,
        closeModal: closeDeleteMiembroModal,
        itemSelected: itemMiembroSelected,
    } = useConfirmationDialog<IMiembro>();

    const { deleting, handleDelete } = useDeleteItem({
        id: itemMiembroSelected?.id,
        onDelete: deleteMiembro,
        callback: () => {
            client.invalidateQueries(["consejos-miembros"]);
            closeDeleteMiembroModal();
        },
    });

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
                    <GridActionsCellItem
                        key={p.id}
                        color="error"
                        disabled={!consejo?.estado}
                        icon={<Icon icon="delete" />}
                        label="Eliminar documento"
                        onClick={() => {
                            console.log({ row: p.row });
                            openDeleteMiembroModal(p.row as IMiembro);
                        }}
                    />,
                ],
            },
        ],
        []
    );

    const {
        isVisible: isVisibleAddMiembroModal,
        openJustModal: openAddMiembroModal,
        closeModal: closeAddMiembroModal,
    } = useConfirmationDialog();

    const { columnVisibilityModel, onColumnVisibilityModelChange } =
        useGridColumnVisibilityModel({
            key: "asistentesTableModel",
        });

    return (
        <Stack spacing={2}>
            <Button
                disabled={!consejo || !consejo?.estado}
                startIcon={<Icon icon="add" />}
                variant="outlined"
                onClick={openAddMiembroModal}
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

            {consejo && isVisibleAddMiembroModal && (
                <AddMiembro
                    consejo={consejo}
                    isVisible={isVisibleAddMiembroModal}
                    onCancel={closeAddMiembroModal}
                />
            )}

            {itemMiembroSelected && isVisibleDeleteMiembroModal && (
                <ConfirmationDialog
                    id="delete-miembro-modal"
                    title="Eliminar"
                    keepMounted={true}
                    isVisible={isVisibleDeleteMiembroModal}
                    onCancel={closeDeleteMiembroModal}
                    onApprove={handleDelete}
                    textApprove="ELIMINAR"
                    buttonColorApprove="error"
                    loading={deleting}
                >
                    <DialogContentText>
                        ¿Está seguro que desea eliminar el registro{" "}
                        <strong>{itemMiembroSelected.docente.nombres}</strong>?
                    </DialogContentText>
                </ConfirmationDialog>
            )}
        </Stack>
    );
}
