import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ConfirmationDialog from "components/ConfirmationDialog";
import ErrorSummary from "components/ErrorSummary";
import Select from "components/Select";
import { SingleAutoComplete } from "components/SingleAutoComplete";
import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import {
  IActaGrado,
  IAddAsistenteActaGrado,
  TipoAsistenteActaGradoEnum,
} from "models/interfaces/IActaGrado";
import { IDocente } from "models/interfaces/IDocente";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { getDocentes } from "services/docentes";
import { saveMiembroActaGrado } from "services/miembro-acta-grado";
import { getOptionLabelDocente, isOptionEqualToValueDocente } from "utils/libs";
import { VALIDATION_MESSAGES as VM } from "utils/messages";

import * as yup from "yup";

type AddAsistenteActaProps = {
  actaGrado: IActaGrado;
  isVisible: boolean;
  onCancel: () => void;
};

const tiposAsistentesActaGrado = [
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
  {
    id: TipoAsistenteActaGradoEnum.PRESIDENTE,
    label: "Presidente",
  },
].sort((a, b) => a.label.localeCompare(b.label));

function esRequeridoIA(tipo: TipoAsistenteActaGradoEnum) {
  return ![
    TipoAsistenteActaGradoEnum.TUTOR,
    TipoAsistenteActaGradoEnum.PRESIDENTE,
  ].includes(tipo);
}

const validationSchema = yup.object({
  actaGrado: yup.number().required(VM.required).min(1, VM.invalidOption),
  docente: yup.number().required(VM.required).min(1, VM.invalidOption),
  tipo: yup
    .mixed()
    .oneOf(Object.values(TipoAsistenteActaGradoEnum), VM.invalidOption),
  informacion_adicional: yup
    .string()
    .test("isRequired", VM.required, (value, context) => {
      if (esRequeridoIA(context.parent.tipo)) {
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

  const { enqueueSnackbar } = useSnackbar();

  const { errorSummary, setErrorSummary, cleanErrorsSumary } =
    useErrorsResponse();

  const onSubmit = async (form: IAddAsistenteActaGrado) => {
    cleanErrorsSumary();

    const result = await saveMiembroActaGrado(form);

    if (result.status === HTTP_STATUS.created) {
      client.invalidateQueries(["miembros-acta-grados", actaGrado.id + ""]);

      enqueueSnackbar(result.message, { variant: "success" });
      handleCloseModal();
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setErrorSummary(result.errors);
    }
  };

  const initialValues: IAddAsistenteActaGrado = {
    docente: -1,
    tipo: TipoAsistenteActaGradoEnum.M_PRINCIPAL,
    informacion_adicional: "",
    actaGrado: actaGrado.id,
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema,
  });

  useEffect(() => {
    formik.setFieldValue("docente", acDocente?.id || -1);
  }, [acDocente]);

  const submitting = formik.isSubmitting;

  const handleReset = formik.handleReset;

  const handleCloseModal = () => {
    formik.resetForm();
    setACDocente(null);
    closeModal();
  };

  const requeridoIA = useMemo(
    () => esRequeridoIA(formik.values.tipo),
    [formik.values.tipo]
  );

  useEffect(() => {
    if (!requeridoIA) formik.setFieldValue("informacion_adicional", "");
  }, [requeridoIA]);

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
        onCancel={handleCloseModal}
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
              items={tiposAsistentesActaGrado}
              value={formik.values.tipo}
              onChange={formik.handleChange}
              error={formik.touched.tipo && Boolean(formik.errors.tipo)}
              errorMessage={formik.touched.tipo && formik.errors.tipo}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required={requeridoIA}
              fullWidth
              disabled={submitting || !requeridoIA}
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

          {errorSummary && <ErrorSummary errors={errorSummary} />}
        </Grid>
      </ConfirmationDialog>
    </Box>
  );
};

export default AddAsistenteActa;
