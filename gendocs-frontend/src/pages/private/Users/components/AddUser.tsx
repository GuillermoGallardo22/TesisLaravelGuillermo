import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField } from "@mui/material";
import ErrorSummary from "components/ErrorSummary";
import Select from "components/Select";
import { useFormik } from "formik";
import { HTTP_STATUS } from "models/enums";
import { IRole, IUserForm } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { createUser, getRoles } from "services/auth";
import { CONSTANTS } from "utils/constants";
import { VALIDATION_MESSAGES } from "utils/messages";
import * as yup from "yup";

const initialValues: IUserForm = {
    correo_principal: "",
    nombre: "",
    correo_secundario: "",
    id: -1,
    rol: -1,
};

const AddUser = () => {
    const [roles, setRoles] = useState<IRole[]>([]);
    const { enqueueSnackbar } = useSnackbar();
    const [errors, setErrors] = useState<string[] | undefined>();

    const loadInitData = useCallback(() => {
        getRoles().then((r) => setRoles(r));
    }, []);

    useEffect(() => {
        loadInitData();
    }, []);

    const onSubmit = async (form: IUserForm): Promise<void> => {
        setErrors(undefined);

        const { status, message, errors } = await createUser(form);

        if (status === HTTP_STATUS.created) {
            enqueueSnackbar(message, { variant: "success" });
        } else {
            enqueueSnackbar(message, { variant: "error" });
            setErrors(errors);
        }
    };

    const validationSchema = yup.object().shape({
        nombre: yup
            .string()
            .required(VALIDATION_MESSAGES.required)
            .max(255, VALIDATION_MESSAGES.maxLength(255)),
        correo_principal: yup
            .string()
            .matches(
                CONSTANTS.email_uta_regex,
                VALIDATION_MESSAGES.invalidFormat
            )
            .required(VALIDATION_MESSAGES.required)
            .max(255, VALIDATION_MESSAGES.maxLength(255)),
        correo_secundario: yup
            .string()
            .matches(
                CONSTANTS.email_gmail_regex,
                VALIDATION_MESSAGES.invalidFormat
            )
            .required(VALIDATION_MESSAGES.required)
            .max(255, VALIDATION_MESSAGES.maxLength(255)),
        rol: yup
            .mixed()
            .oneOf(
                roles.map((item) => item.id),
                VALIDATION_MESSAGES.invalidOption
            )
            .required(VALIDATION_MESSAGES.required),
    });

    const formik = useFormik({
        onSubmit,
        initialValues,
        validationSchema,
        enableReinitialize: true,
    });

    const submitting = formik.isSubmitting;

    const handleReset = (e: any) => {
        setErrors(undefined);
        formik.handleReset(e);
    };

    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            onReset={handleReset}
            noValidate
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Select
                        id="rol"
                        name="rol"
                        label="Rol"
                        items={roles.map((i) => ({
                            id: i.id,
                            label: i.nombre,
                        }))}
                        value={formik.values.rol}
                        onChange={formik.handleChange}
                        error={formik.touched.rol && Boolean(formik.errors.rol)}
                        errorMessage={formik.touched.rol && formik.errors.rol}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="nombre"
                        name="nombre"
                        label="Nombre"
                        autoComplete="off"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.nombre &&
                            Boolean(formik.errors.nombre)
                        }
                        helperText={
                            formik.touched.nombre && formik.errors.nombre
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="correo_principal"
                        name="correo_principal"
                        label="Correo principal (UTA)"
                        autoComplete="off"
                        placeholder="usuario@uta.edu.ec"
                        value={formik.values.correo_principal}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.correo_principal &&
                            Boolean(formik.errors.correo_principal)
                        }
                        helperText={
                            formik.touched.correo_principal &&
                            formik.errors.correo_principal
                        }
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        id="correo_secundario"
                        name="correo_secundario"
                        label="Correo secundario (GMAIL)"
                        placeholder="usuario@gmail.com"
                        autoComplete="off"
                        value={formik.values.correo_secundario}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.correo_secundario &&
                            Boolean(formik.errors.correo_secundario)
                        }
                        helperText={
                            formik.touched.correo_secundario &&
                            formik.errors.correo_secundario
                        }
                    />
                </Grid>

                <Grid item xs={12}>
                    <ErrorSummary errors={errors} />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <LoadingButton
                        fullWidth
                        type="reset"
                        color="error"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={submitting}
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

export default AddUser;
