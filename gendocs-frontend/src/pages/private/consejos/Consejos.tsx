import { Button, DialogContentText, Stack, TextField } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import { ChipStatus, ConfirmationDialog, Icon } from "components";
import { useDeleteItem } from "hooks/useDeleteItem";
import { useFilterPagination } from "hooks/useFilterPagination";
import { IConsejo } from "models/interfaces";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { deleteConsejo, getConsejos } from "services";
import { parseToDateTime } from "utils/date";

export default function Consejos() {
    const [token, setToken] = useState(1);

    const {
        data,
        handlePageChange,
        handlePageSizeChange,
        loading,
        search,
        setSearch,
    } = useFilterPagination({
        fetch: getConsejos,
        token: token,
    });

    const [isVisible, setIsVisible] = useState(false);

    const [itemSelected, setItemSelected] = useState<IConsejo | null>(null);

    const openModal = (item: IConsejo) => {
        setItemSelected(item);
        setIsVisible(true);
    };

    const closeModal = () => {
        setItemSelected(null);
        setIsVisible(false);
    };

    const { deleting, handleDelete } = useDeleteItem({
        id: itemSelected?.id,
        onDelete: deleteConsejo,
        callback: () => {
            setToken(Date.now());
            closeModal();
        },
    });

    const columns = useMemo(
        (): GridColumns => [
            { field: "nombre", headerName: "Nombre", flex: 1 },
            {
                field: "fecha",
                headerName: "Fecha",
                flex: 1,
                renderCell: (item) => parseToDateTime(item.value),
            },
            {
                field: "tipo_consejo",
                headerName: "Tipo",
                width: 120,
                renderCell: (item) => item.value.nombre,
            },
            {
                field: "estado",
                headerName: "Estado",
                renderCell: (item) => (
                    <ChipStatus
                        value={item.value}
                        textPrimary="Abierto"
                        textSecondary="Cerrado"
                        colorSecondary="success"
                    />
                ),
            },
            {
                type: "actions",
                field: "actions",
                headerName: "Acciones",
                width: 180,
                getActions: (p) => [
                    <GridActionsCellItem
                        key={p.id}
                        disabled={!p.row.estado}
                        color="primary"
                        label="Editar"
                        LinkComponent={Link}
                        to={p.row?.id + ""}
                        icon={<Icon icon="edit" />}
                    />,
                    <GridActionsCellItem
                        key={p.id}
                        color="primary"
                        label="Asistencia"
                        LinkComponent={Link}
                        to={p.row?.id + "/asistencia"}
                        icon={<Icon icon="factCheck" />}
                    />,
                    <GridActionsCellItem
                        key={p.id}
                        disabled={!p.row.estado}
                        color="error"
                        label="Eliminar"
                        icon={<Icon icon="delete" />}
                        onClick={() => openModal(p.row as IConsejo)}
                    />,
                ],
            },
        ],
        []
    );

    return (
        <>
            <Stack spacing={2}>
                <Button
                    component={Link}
                    startIcon={<Icon icon="add" />}
                    to="nuevo"
                    variant="outlined"
                >
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

            {itemSelected && (
                <ConfirmationDialog
                    id="delete-consejo-modal"
                    keepMounted={true}
                    isVisible={isVisible}
                    title="Eliminar"
                    onCancel={closeModal}
                    onApprove={handleDelete}
                    textApprove="ELIMINAR"
                    buttonColorApprove="error"
                    loading={deleting}
                >
                    <DialogContentText>
                        ¿Está seguro que desea eliminar el registro{" "}
                        <strong>{itemSelected.nombre}</strong>?
                    </DialogContentText>
                </ConfirmationDialog>
            )}
        </>
    );
}
