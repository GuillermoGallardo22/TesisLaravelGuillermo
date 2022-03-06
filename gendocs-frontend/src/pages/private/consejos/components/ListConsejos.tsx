import {
    Button,
    DialogContentText,
    IconButton,
    Stack,
    TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ChipStatus from "components/ChipStatus";
import Icon from "components/Icon";
import { useFilterPagination } from "hooks/useFilterPagination";
import { Link } from "react-router-dom";
import { deleteConsejo, getConsejos } from "services/consejos";
import { format } from "date-fns";
import { useCallback, useState } from "react";
import ConfirmationDialog from "./ConfirmationDialog";
import { IConsejo } from "models/interfaces";
import { useDeleteItem } from "hooks/useDeleteItem";

export default function ListConsejos() {
    const [token, setToken] = useState(1);

    const {
        data,
        handlePageChange,
        handlePageSizeChange,
        loading,
        search,
        setSearch,
    } = useFilterPagination({
        callback: getConsejos,
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

    const columns = useCallback((): GridColDef[] => {
        return [
            { field: "nombre", headerName: "Nombre", flex: 1 },
            {
                field: "fecha",
                headerName: "Fecha",
                flex: 1,
                renderCell: (item) =>
                    format(new Date(item.value), "dd/MM/yyyy HH:mm a"),
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
                field: "id",
                headerName: "Acciones",
                renderCell: (item) =>
                    item.row.estado && (
                        <>
                            <IconButton
                                color="primary"
                                component={Link}
                                to={item.value + ""}
                            >
                                <Icon icon="edit" />
                            </IconButton>

                            <IconButton
                                color="error"
                                onClick={() => openModal(item.row)}
                            >
                                <Icon icon="delete" />
                            </IconButton>
                        </>
                    ),
            },
        ];
    }, []);

    return (
        <>
            <Stack spacing={3}>
                <Button
                    component={Link}
                    startIcon={<Icon icon="add" />}
                    to="nuevo"
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
                        pagination
                        paginationMode="server"
                        onPageSizeChange={handlePageSizeChange}
                        onPageChange={handlePageChange}
                        //
                        columns={columns()}
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
