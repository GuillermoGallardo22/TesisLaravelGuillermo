import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    Button,
    Chip,
    Grid,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import ChipStatus from "components/ChipStatus";
import IconButton from "components/IconButton";
import Select from "components/Select";
import { useFilterPagination } from "hooks/useFilterPagination";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { getPlantillasByProcesoId } from "services/plantillas";
import { useMoveTemplate } from "../hooks/useMoveTemplate";

const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "5px",
    radius: 5,
    p: 4,
};

const ListTemplates = () => {
    const { processId = "" } = useParams<{ processId: string }>();

    const {
        data,
        handlePageChange,
        handlePageSizeChange,
        loading,
        search,
        setSearch,
    } = useFilterPagination({
        callback: getPlantillasByProcesoId,
        filters: {
            processId,
        },
    });

    const [templateSelected, setTemplateSelected] = useState<number | null>(
        null
    );
    const [open, setOpen] = useState(false);

    const { formik, procesos } = useMoveTemplate({
        callback: () => {
            handleClose();
        },
    });

    const submitting = formik.isSubmitting;

    const handleOpen = (templateId: number) => {
        setOpen(true);
        setTemplateSelected(templateId);
    };

    const handleClose = () => {
        setOpen(false);
        setTemplateSelected(null);
        formik.resetForm();
    };

    const columns: GridColDef[] = [
        { field: "nombre", headerName: "Nombre", flex: 1 },
        { field: "autor", headerName: "Autor", flex: 1 },
        {
            field: "estado",
            headerName: "Estado",
            width: 120,
            renderCell: (item: GridRenderCellParams) => (
                <ChipStatus value={item?.value} />
            ),
        },
        {
            field: "id",
            headerName: "Acciones",
            flex: 1,
            renderCell: (item: GridRenderCellParams) => (
                <>
                    <IconButton
                        icon="article"
                        color="primary"
                        component={RouterLink}
                        tooltipText="Ver documento"
                        to={`${item?.value}/drive`}
                    />

                    <IconButton
                        icon="edit"
                        component={RouterLink}
                        tooltipText="Editar"
                        to={`${item.value}`}
                    />

                    <IconButton
                        icon="move"
                        tooltipText="Mover"
                        onClick={() => handleOpen(item.value)}
                    />
                </>
            ),
        },
    ];

    useEffect(() => {
        formik.setFieldValue("plantilla", templateSelected || -1);
    }, [templateSelected]);

    return (
        <Stack spacing={3}>
            <Button component={RouterLink} startIcon={<AddIcon />} to="nuevo">
                AÑADIR PLANTILLA
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
                    columns={columns}
                    loading={loading}
                    //
                    rows={data.data}
                    page={data.meta.current_page}
                    pageSize={data.meta.per_page}
                    rowCount={data.meta.total}
                />
            </div>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={style}
                    component="form"
                    onSubmit={formik.handleSubmit}
                    onReset={formik.handleReset}
                    noValidate
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="h2">
                                Mover
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Select
                                id="proceso"
                                name="proceso"
                                label="Procesos"
                                items={procesos.map((item) => ({
                                    id: item.id,
                                    label: item.nombre,
                                }))}
                                value={formik.values.proceso}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.proceso &&
                                    Boolean(formik.errors.proceso)
                                }
                                errorMessage={
                                    formik.touched.proceso &&
                                    formik.errors.proceso
                                }
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <LoadingButton
                                fullWidth
                                type="reset"
                                color="warning"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={submitting}
                                onClick={handleClose}
                            >
                                Cerrar
                            </LoadingButton>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <LoadingButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={submitting}
                                loading={submitting}
                            >
                                Aceptar
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </Stack>
    );
};

export default ListTemplates;
