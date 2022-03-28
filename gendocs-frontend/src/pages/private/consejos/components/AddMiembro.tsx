import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import {
    ConfirmationDialog,
    ConfirmationDialogProps,
    ErrorSummary,
} from "components";
import { useAutocomplete } from "hooks";
import { IConsejo, IDocente } from "models/interfaces";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { getDocentes } from "services";
import { useAddMiembro } from "../hooks/useAddMiembro";

interface AddMiembroProps
    extends Pick<ConfirmationDialogProps, "isVisible" | "onCancel"> {
    consejo: IConsejo;
}

export const AddMiembro: React.FunctionComponent<AddMiembroProps> = ({
    consejo,
    isVisible,
    onCancel: closeModal,
}) => {
    // ESTUDIANTE
    const {
        items: itemsMIEM,
        isOpen: isOpenMIEM,
        openModal: openModalMIEM,
        closeModal: closeModalMIEM,
        searching: searchingMIEM,
        value: valueMIEM,
        onChange: onChangeMIEM,
        onInputChange: onInputChangeMIEM,
        resetValue: resetValueMIEM,
    } = useAutocomplete<IDocente>({
        fetch: getDocentes,
        preventSubmitOnOpen: true,
    });

    const client = useQueryClient();

    const { formik, handleReset, errorSummary } = useAddMiembro({
        consejo,
        onResetAuxValues: resetValueMIEM,
        callback: () => {
            client.invalidateQueries(["consejos-miembros"]);
            setTimeout(closeModal, 100);
        },
    });

    useEffect(() => {
        formik.setFieldValue("docente", valueMIEM?.id || -1);
    }, [valueMIEM]);

    const submitting = formik.isSubmitting;

    return (
        <Box
            id="add-miembro-form"
            component="form"
            onSubmit={formik.handleSubmit}
            onReset={handleReset}
            noValidate
        >
            <ConfirmationDialog
                id="add-miembro-modal"
                keepMounted={true}
                isVisible={isVisible}
                title="Agregar miembros"
                onCancel={closeModal}
                textApprove="Agregar"
                buttonColorCancel="error"
                loading={searchingMIEM || submitting}
                onCancelButtonProps={{
                    type: "reset",
                }}
                onApproveButtonProps={{
                    type: "submit",
                    form: "add-miembro-form",
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <Autocomplete
                                fullWidth
                                id="autocomplete-miembros"
                                open={isOpenMIEM}
                                onOpen={openModalMIEM}
                                onClose={closeModalMIEM}
                                options={itemsMIEM}
                                isOptionEqualToValue={(option, value) =>
                                    option.nombres === value.nombres
                                }
                                getOptionLabel={(option) => option.nombres}
                                loading={searchingMIEM}
                                filterOptions={(x) => x}
                                autoComplete
                                includeInputInList
                                filterSelectedOptions
                                value={valueMIEM}
                                onChange={onChangeMIEM}
                                onInputChange={onInputChangeMIEM}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        required
                                        label="Docente"
                                        margin="normal"
                                        placeholder="Cédula | Nombres | Apellidos"
                                        error={
                                            formik.touched.docente &&
                                            Boolean(formik.errors.docente)
                                        }
                                        helperText={
                                            formik.touched.docente &&
                                            formik.errors.docente
                                        }
                                        InputProps={{
                                            ...params.InputProps,
                                            endAdornment: (
                                                <>
                                                    {searchingMIEM ? (
                                                        <CircularProgress
                                                            color="inherit"
                                                            size={20}
                                                        />
                                                    ) : null}
                                                    {
                                                        params.InputProps
                                                            .endAdornment
                                                    }
                                                </>
                                            ),
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <FormLabel component="legend">Es responsable</FormLabel>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formik.values.responsable}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            "responsable",
                                            e.target.checked
                                        )
                                    }
                                />
                            }
                            label={formik.values.responsable ? "Si" : "No"}
                            labelPlacement="start"
                        />
                    </Grid>

                    {errorSummary && <ErrorSummary errors={errorSummary} />}
                </Grid>
            </ConfirmationDialog>
        </Box>
    );
};
