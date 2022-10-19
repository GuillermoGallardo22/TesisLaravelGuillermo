import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ConfirmationDialog, Select, SingleAutoComplete } from "components";
import { useFormik } from "formik";
import { IActaGrado, IDocente } from "models/interfaces";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { getDocentes } from "services";
import {
  getOptionLabelDocente,
  isOptionEqualToValueDocente,
  VALIDATION_MESSAGES as VM,
} from "utils";
import * as yup from "yup";

type AddAsistenteActaProps = {
  actaGrado: IActaGrado;
  isVisible: boolean;
  onCancel: () => void;
};

enum TipoAsistenteActaGradoEnum {
  "TUTOR",
  "M_PRINCIPAL",
  "M_SUPLENTE",
}

interface IAddAsistenteActaGrado {
  docente: number;
  tipo: TipoAsistenteActaGradoEnum;
  informacion_adicional: string;
}

const initialValues: IAddAsistenteActaGrado = {
  docente: -1,
  tipo: TipoAsistenteActaGradoEnum.M_PRINCIPAL,
  informacion_adicional: "",
};

const validationSchema = yup.object({
  docente: yup.number().required(VM.required).min(1, VM.invalidOption),
  tipo: yup
    .mixed()
    .oneOf(Object.values(TipoAsistenteActaGradoEnum), VM.invalidOption),
  informacion_adicional: yup
    .string()
    .test("isRequired", VM.required, (value, context) => {
      if (context.parent.tipo !== TipoAsistenteActaGradoEnum.TUTOR) {
        return Boolean(value && value.length > 0);
      }

      return true;
    }),
});

const AddAsistenteActa: React.FunctionComponent<AddAsistenteActaProps> = ({
  actaGrado,
  isVisible,
  onCancel: closeModal,
}) => {
  const client = useQueryClient();
  const [acDocente, setACDocente] = useState<IDocente | null>(null);

  const onSubmit = async (form: IAddAsistenteActaGrado) => {
    console.log({ form });
    await new Promise((r) => setTimeout(r, 1500));

    // closeModal();
    // client.invalidateQueries(["consejos-miembros"]);
    handleClose();
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
  });

  useEffect(() => {
    formik.setFieldValue("docente", acDocente?.id || -1);
  }, [acDocente]);

  const submitting = formik.isSubmitting;

  const handleReset = formik.handleReset;

  const handleClose = () => {
    closeModal();
    formik.resetForm();
  };

  const noEsTutor = formik.values.tipo !== TipoAsistenteActaGradoEnum.TUTOR;

  useEffect(() => {
    if (!noEsTutor) formik.setFieldValue("informacion_adicional", "");
  }, [noEsTutor]);

  return (
    <Box
      id="add-miembro-form"
      component="form"
      onSubmit={formik.handleSubmit}
      onReset={handleReset}
      noValidate
    >
      <ConfirmationDialog
        id="add-asistente-acta"
        keepMounted={true}
        isVisible={isVisible}
        title="Agregar miembros"
        onCancel={handleClose}
        textApprove="Agregar"
        buttonColorCancel="error"
        loading={submitting}
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
            <SingleAutoComplete
              key="autocomplete-asistente-acta"
              value={acDocente}
              onChange={setACDocente}
              hookProps={{
                fetch: getDocentes,
                preventSubmitOnOpen: true,
              }}
              AutoCompleteProps={{
                id: "autocomplete-asistente-acta",
                disabled: submitting,
                isOptionEqualToValue: isOptionEqualToValueDocente,
                getOptionLabel: getOptionLabelDocente,
              }}
              TextFieldProps={{
                required: true,
                label: "Docente",
                placeholder: "Nombre",
                disabled: submitting,
                error: formik.touched.docente && Boolean(formik.errors.docente),
                helperText: formik.touched.docente && formik.errors.docente,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Select
              required
              id="tipo"
              name="tipo"
              label="Tipo de acta"
              disabled={submitting}
              items={[
                {
                  id: TipoAsistenteActaGradoEnum.TUTOR,
                  label: "Tutor",
                },
                {
                  id: TipoAsistenteActaGradoEnum.M_PRINCIPAL,
                  label: "Miembro principal",
                },
                {
                  id: TipoAsistenteActaGradoEnum.M_SUPLENTE,
                  label: "Miembro suplente",
                },
              ]}
              value={formik.values.tipo}
              onChange={formik.handleChange}
              error={formik.touched.tipo && Boolean(formik.errors.tipo)}
              errorMessage={formik.touched.tipo && formik.errors.tipo}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required={noEsTutor}
              fullWidth
              disabled={submitting || !noEsTutor}
              margin="normal"
              id="informacion_adicional"
              name="informacion_adicional"
              label="Información adicional"
              value={formik.values.informacion_adicional}
              onChange={formik.handleChange}
              error={
                formik.touched.informacion_adicional &&
                Boolean(formik.errors.informacion_adicional)
              }
              helperText={
                formik.touched.informacion_adicional &&
                formik.errors.informacion_adicional
              }
            />
          </Grid>

          {/* <Grid item xs={12}>
            <pre>
              {JSON.stringify(
                { errors: formik.errors, touched: formik.touched },
                null,
                2
              )}
            </pre>
          </Grid> */}

          {/* <Grid item xs={12} sx={{ mb: 2 }}>
            <FormLabel component="legend">Es responsable</FormLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.responsable}
                  onChange={(e) =>
                    formik.setFieldValue("responsable", e.target.checked)
                  }
                />
              }
              label={formik.values.responsable ? "Si" : "No"}
              labelPlacement="start"
            />
          </Grid> */}

          {/* {errorSummary && <ErrorSummary errors={errorSummary} />} */}
        </Grid>
      </ConfirmationDialog>
    </Box>
  );
};

export default AddAsistenteActa;
