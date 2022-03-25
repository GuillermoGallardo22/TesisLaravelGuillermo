import {
    Button,
    DialogContentText,
    IconButton,
    Stack,
    TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ChipStatus from "components/ChipStatus";
import ConfirmationDialog from "components/ConfirmationDialog";
import Icon from "components/Icon";
import { useDeleteItem } from "hooks/useDeleteItem";
import { useFilterPagination } from "hooks/useFilterPagination";
import { IConsejo } from "models/interfaces";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { deleteConsejo, getConsejos } from "services/consejos";
import { parseToDateTime } from "utils/date";

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

    const columns = useCallback((): GridColDef[] => {
        return [
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
