import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ErrorSummary from "components/ErrorSummary";
import Select from "components/Select";
import { useState } from "react";
import { readFile } from "utils/libs";
import {
    useAddMultipleStudent,
    useAddSimpleStudent,
} from "../hooks/useAddStudent";

const AddStudents = () => {
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Agregar estudiante</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AddSimpleStudent />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Agregar multiples estudiantes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <AddMultipleStudents />
                </AccordionDetails>
            </Accordion>
        </>
    );
};

const AddSimpleStudent = () => {
    const { formik, submitting, carreras, errorSummary } =
        useAddSimpleStudent();

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            onReset={formik.handleReset}
            noValidate
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Select
                        id="carrera"
                        name="carrera"
                        label="Carrera"
                        items={carreras.map((item) => ({
                            id: item.id,
                            label: item.nombre,
                        }))}
                        value={formik.values.carrera}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.carrera &&
                            Boolean(formik.errors.carrera)
                        }
                        errorMessage={
                            formik.touched.carrera && formik.errors.carrera
                        }
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="cedula"
                        name="cedula"
                        label="Cédula"
                        value={formik.values.cedula}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.cedula &&
                            Boolean(formik.errors.cedula)
                        }
                        helperText={
                            formik.touched.cedula && formik.errors.cedula
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="nombres"
                        name="nombres"
                        label="Nombres"
                        value={formik.values.nombres}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.nombres &&
                            Boolean(formik.errors.nombres)
                        }
                        helperText={
                            formik.touched.nombres && formik.errors.nombres
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="apellidos"
                        name="apellidos"
                        label="Apellidos"
                        value={formik.values.apellidos}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.apellidos &&
                            Boolean(formik.errors.apellidos)
                        }
                        helperText={
                            formik.touched.apellidos && formik.errors.apellidos
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="celular"
                        name="celular"
                        label="Celular"
                        value={formik.values.celular}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.celular &&
                            Boolean(formik.errors.celular)
                        }
                        helperText={
                            formik.touched.celular && formik.errors.celular
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="telefono"
                        name="telefono"
                        label="Teléfono"
                        value={formik.values.telefono}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.telefono &&
                            Boolean(formik.errors.telefono)
                        }
                        helperText={
                            formik.touched.telefono && formik.errors.telefono
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="correo_uta"
                        name="correo_uta"
                        label="Correo UTA"
                        autoComplete="correo_uta"
                        value={formik.values.correo_uta}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.correo_uta &&
                            Boolean(formik.errors.correo_uta)
                        }
                        helperText={
                            formik.touched.correo_uta &&
                            formik.errors.correo_uta
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        margin="normal"
                        id="correo"
                        name="correo"
                        label="Correo"
                        autoComplete="correo"
                        value={formik.values.correo}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.correo &&
                            Boolean(formik.errors.correo)
                        }
                        helperText={
                            formik.touched.correo && formik.errors.correo
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="matricula"
                        name="matricula"
                        label="Matrícula"
                        value={formik.values.matricula}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.matricula &&
                            Boolean(formik.errors.matricula)
                        }
                        helperText={
                            formik.touched.matricula && formik.errors.matricula
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="folio"
                        name="folio"
                        label="Folio"
                        value={formik.values.folio}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.folio && Boolean(formik.errors.folio)
                        }
                        helperText={formik.touched.folio && formik.errors.folio}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ErrorSummary errors={errorSummary} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <LoadingButton
                        fullWidth
                        type="reset"
                        color="warning"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={submitting}
                        loading={submitting}
                    >
                        Limpiar
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
                        Guardar
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
};

const columns: GridColDef[] = [
    { field: "id", headerName: "#", width: 30 },
    { field: "cedula", headerName: "Cédula", width: 110 },
    { field: "apellidos", headerName: "Apellidos", width: 250 },
    { field: "nombres", headerName: "Nombres", width: 250 },
    { field: "telefono", headerName: "Teléfono", width: 110 },
    { field: "celular", headerName: "Celular", width: 110 },
    { field: "correo", headerName: "Correo", width: 250 },
    { field: "correo_uta", headerName: "Correo UTA", width: 250 },
    { field: "matricula", headerName: "Matrícula", width: 100 },
    { field: "folio", headerName: "Folio", width: 100 },
];

const AddMultipleStudents = () => {
    const { formik, submitting, carreras } = useAddMultipleStudent();

    const [file, setFile] = useState<File>();

    const [reading, setReading] = useState(false);

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleReset();
        setReading(true);

        try {
            const _file = event?.target?.files
                ? event.target.files[0]
                : undefined;

            if (!_file) {
                setReading(false);
                return;
            }

            setFile(_file);

            readFile(_file)
                .then((students) => {
                    formik.setFieldValue("estudiantes", students);
                })
                .finally(() => setReading(false));
        } catch (error) {
            setReading(false);
        }
    };

    const handleReset = () => {
        setFile(undefined);
        formik.resetForm();
    };

    return (
        <Stack spacing={3}>
            <Box>
                <LoadingButton
                    variant="contained"
                    disabled={reading || submitting}
                    loading={reading || submitting}
                    component="label"
                >
                    Subir archivo...
                    <input
                        id="contained-button-file"
                        type="file"
                        disabled={reading}
                        onChange={handleChangeFile}
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
                        hidden
                    />
                </LoadingButton>
                <label
                    style={{ marginLeft: "1rem" }}
                    htmlFor="contained-button-file"
                >
                    {file?.name && !reading && file.name}
                </label>
            </Box>

            <Box>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    onReset={handleReset}
                    noValidate
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Select
                                id="carrera"
                                name="carrera"
                                label="Carrera"
                                items={carreras.map((item) => ({
                                    id: item.id,
                                    label: item.nombre,
                                }))}
                                value={formik.values.carrera}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.carrera &&
                                    Boolean(formik.errors.carrera)
                                }
                                errorMessage={
                                    formik.touched.carrera &&
                                    formik.errors.carrera
                                }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <div style={{ height: 600, width: "100%" }}>
                                <DataGrid
                                    rows={formik.values.estudiantes}
                                    columns={columns}
                                />
                            </div>
                        </Grid>

                        {formik?.errors?.estudiantes && (
                            <Grid item xs={12}>
                                <Alert severity="error">
                                    {typeof formik.errors.estudiantes ===
                                    "string" ? (
                                        <p>{formik.errors.estudiantes}</p>
                                    ) : (
                                        <>
                                            <p>
                                                Verifique los errores en las
                                                siguientes filas del documento.
                                            </p>

                                            {formik.errors.estudiantes.map(
                                                (item, index) =>
                                                    item && (
                                                        <pre key={index}>
                                                            {JSON.stringify(
                                                                {
                                                                    fila:
                                                                        index +
                                                                        2,
                                                                    errores:
                                                                        item,
                                                                },
                                                                null,
                                                                2
                                                            )}
                                                        </pre>
                                                    )
                                            )}
                                        </>
                                    )}
                                </Alert>
                            </Grid>
                        )}

                        <Grid item xs={12} sm={6}>
                            <LoadingButton
                                fullWidth
                                type="reset"
                                color="warning"
                                onClick={handleReset}
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={submitting || reading}
                                loading={submitting || reading}
                            >
                                Limpiar
                            </LoadingButton>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <LoadingButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={submitting || reading}
                                loading={submitting || reading}
                            >
                                Guardar
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Stack>
    );
};

export default AddStudents;
