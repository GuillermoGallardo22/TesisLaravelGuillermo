import { Box, Button, Grid, Stack } from "@mui/material";
import {
    DataGrid,
    GridActionsCellItem,
    GridColumns,
    GridColumnVisibilityModel,
    GridToolbar,
} from "@mui/x-data-grid";
import Icon from "components/Icon";
import Select from "components/Select";
import { useAuthContext } from "contexts/AuthContext";
import { IDocumento } from "models/interfaces";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    generateLink,
    getAutor,
    getCreado,
    getDocumentosTableModel,
    getNombreCompleto,
    getPlantilla,
    getProceso,
} from "utils/libs";
import { useListDocumentos } from "../hooks/useListDocumentos";

export default function ListDocumentos() {
    const { consejos, documentos, consejo, loading, setConsejo } =
        useListDocumentos();

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
                        icon={<Icon icon="article" />}
                        label="Ver documento"
                    />,
                    <GridActionsCellItem
                        key={p.id}
                        color="error"
                        icon={<Icon icon="delete" />}
                        label="Eliminar documento"
                    />,
                ],
            },
        ],
        []
    );

    const [columnVisibilityModel, setColumnVisibilityModel] =
        useState<GridColumnVisibilityModel>(getDocumentosTableModel());

    return (
        <Stack spacing={2}>
            <Button
                component={Link}
                startIcon={<Icon icon="add" />}
                to="nuevo"
                variant="outlined"
            >
                CREAR DOCUMENTO
            </Button>
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
                    onColumnVisibilityModelChange={(model) => {
                        localStorage.setItem(
                            "documentosTableModel",
                            JSON.stringify(model)
                        );
                        setColumnVisibilityModel(model);
                    }}
                    components={{ Toolbar: GridToolbar }}
                    columns={columns}
                    loading={loading}
                    rows={documentos}
                />
            </div>
        </Stack>
    );
}
