import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Grid, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Select } from "components";
import { useState } from "react";
import { readFile } from "utils/libs";
import { useAddEstudiantes } from "../hooks/useAddEstudiantes";
import ListStudentsErrors from "./ListEstudianteErrors";

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

export const FormEstudiantes = () => {
    const { formik, submitting, carreras } = useAddEstudiantes();

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
        <Stack spacing={2}>
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
                            <ListStudentsErrors
                                errors={formik?.errors?.estudiantes}
                            />
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
