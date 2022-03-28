import { Box, Button, DialogContentText, Grid, Stack } from "@mui/material";
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    GridToolbar,
} from "@mui/x-data-grid";
import { ConfirmationDialog, Icon, Select } from "components";
import { useAuthContext } from "contexts/AuthContext";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { IDocumento } from "models/interfaces";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
    generateLink,
    getAutor,
    getCreado,
    getNombreCompleto,
    getPlantilla,
    getProceso,
} from "utils";
import { useListDocumentos } from "./hooks/useListDocumentos";

export default function Documentos() {
    const {
        consejos,
        documentos,
        consejo,
        loading,
        setConsejo,
        //
        confirmationDialog: { isVisible, openModal, closeModal, itemSelected },
        deleteItem: { handleDelete, deleting },
    } = useListDocumentos();

    const {
        context: { user },
    } = useAuthContext();

    const columns = useMemo(
        (): GridColumns => [
            {
                type: "number",
                field: "numero",
                headerName: "Número",
                // width: 110,
            },
            {
                field: "destinatario",
                headerName: "Destinatario",
                flex: 1.5,
                valueGetter: getNombreCompleto,
            },
            {
                field: "plantilla",
                headerName: "Plantilla",
                valueGetter: getPlantilla,
                flex: 1,
            },
            {
                field: "proceso",
                headerName: "Proceso",
                valueGetter: getProceso,
                flex: 1,
            },
            {
                field: "autor",
                headerName: "Autor",
                valueGetter: getAutor,
                flex: 1,
            },
            {
                field: "descripcion",
                headerName: "Descripción",
                flex: 1,
            },
            {
                type: "dateTime",
                field: "creado",
                headerName: "F. creación",
                valueFormatter: getCreado,
                flex: 1,
            },
            {
                type: "actions",
                field: "notificaciones",
                headerName: "Notificaciones",
                width: 120,
                getActions: (p) => [
                    <GridActionsCellItem
                        key={p.id}
                        disabled={!p.row?.estudiante?.celular}
                        LinkComponent={"a"}
                        href={generateLink(p.row as IDocumento, user.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ color: "#009380" }}
                        icon={<Icon icon="whatsApp" />}
                        label="Notificar vía WhatsApp"
                    />,
                    <GridActionsCellItem
                        key={p.id}
                        disabled={!p.row?.estudiante?.correo_uta}
                        color="primary"
                        icon={<Icon icon="email" />}
                        label="Notificar vía correo institucional"
                    />,
                ],
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
                        disabled={!p.row.drive}
                        to={`drive/${p.row.drive}`}
                        icon={<Icon icon="article" />}
                        label="Ver documento"
                    />,
                    <GridActionsCellItem
                        key={p.id}
                        color="error"
                        icon={<Icon icon="delete" />}
                        label="Eliminar documento"
                        onClick={() => openModal(p.row as IDocumento)}
                    />,
                ],
            },
        ],
        []
    );

    const { columnVisibilityModel, onColumnVisibilityModelChange } =
        useGridColumnVisibilityModel({
            key: "documentosTableModel",
        });

    return (
        <Stack spacing={2}>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            component={Link}
                            startIcon={<Icon icon="add" />}
                            to="nuevo"
                            variant="outlined"
                        >
                            CREAR DOCUMENTO
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            fullWidth
                            component={Link}
                            startIcon={<Icon icon="numbers" />}
                            to="reservar"
                            variant="outlined"
                        >
                            RESERVAR NUMERACIÓN
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Select
                            id="consejo"
                            name="consejo"
                            label="Consejo"
                            items={consejos.map((i) => ({
                                id: i.id,
                                label: i.nombre,
                            }))}
                            value={consejo}
                            onChange={(e) => setConsejo(+e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>

            <div style={{ height: 700, width: "100%" }}>
                <DataGrid
                    disableColumnMenu
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={
                        onColumnVisibilityModelChange
                    }
                    components={{ Toolbar: GridToolbar }}
                    columns={columns}
                    loading={loading}
                    rows={documentos}
                />
            </div>

            {itemSelected && (
                <ConfirmationDialog
                    id="delete-documento-modal"
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
                        ¿Está seguro que desea eliminar el documento número{" "}
                        <strong>{itemSelected.numero}</strong>?
                    </DialogContentText>
                </ConfirmationDialog>
            )}
        </Stack>
    );
}
