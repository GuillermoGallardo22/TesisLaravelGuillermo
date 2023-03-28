import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import ConfirmationDialog from "components/ConfirmationDialog";
import ErrorSummary from "components/ErrorSummary";
import Select from "components/Select";
import { SingleAutoComplete } from "components/SingleAutoComplete";
import { format, parseISO } from "date-fns";
import { useFormik } from "formik";
import { useErrorsResponse } from "hooks/useErrorsResponse";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import {
  IActaGrado,
  IAddAsistenteActaGrado,
  IMiembroActaGrado,
  TipoAsistenteActaGradoEnum,
} from "models/interfaces/IActaGrado";
import { IDocente } from "models/interfaces/IDocente";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { getDocentes } from "services/docentes";
import {
  saveMiembroActaGrado,
  updateMiembroActaGrado,
} from "services/miembro-acta-grado";
import { CONSTANTS } from "utils/constants";
import { getOptionLabelDocente, isOptionEqualToValueDocente } from "utils/libs";
import { VALIDATION_MESSAGES as VM } from "utils/messages";

import * as yup from "yup";

type AddAsistenteActaProps = {
  actaGrado: IActaGrado;
  isVisible: boolean;
  onCancel: () => void;
  miembro: IMiembroActaGrado | null;
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
  return ![TipoAsistenteActaGradoEnum.TUTOR].includes(tipo);
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
  fecha_asignacion: yup.date().nullable(),
});

const AddAsistenteActa: React.FunctionComponent<AddAsistenteActaProps> = ({
  actaGrado,
  isVisible,
  onCancel: closeModal,
  miembro,
}) => {
  const client = useQueryClient();
  const [acDocente, setACDocente] = useState<IDocente | null>(
    miembro?.docente || null
  );

  const isEditMode = Boolean(miembro);

  const { enqueueSnackbar } = useSnackbar();

  const { errorSummary, setErrorSummary, cleanErrorsSumary } =
    useErrorsResponse();

  const onSubmit = async (form: IAddAsistenteActaGrado) => {
    cleanErrorsSumary();

    const result = miembro
      ? await updateMiembroActaGrado(miembro.id, {
          ...form,
          fecha_asignacion: form.fecha_asignacion
            ? format(form.fecha_asignacion, "yyyy-MM-dd")
            : "",
        })
      : await saveMiembroActaGrado({
          ...form,
          fecha_asignacion: form.fecha_asignacion
            ? format(form.fecha_asignacion, "yyyy-MM-dd")
            : "",
        });

    if (
      result.status === HTTP_STATUS.created ||
      result.status === HTTP_STATUS.ok
    ) {
      client.invalidateQueries(["miembros-acta-grados", actaGrado.id + ""]);

      enqueueSnackbar(result.message, { variant: "success" });
      handleCloseModal();
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setErrorSummary(result.errors);
    }
  };

  const initialValues = useMemo(
    (): IAddAsistenteActaGrado => ({
      docente: miembro?.docente?.id || -1,
      tipo: miembro?.tipo || TipoAsistenteActaGradoEnum.M_PRINCIPAL,
      informacion_adicional: miembro?.informacion_adicional || "",
      actaGrado: actaGrado.id,
      fecha_asignacion: miembro?.fecha_asignacion
        ? parseISO(miembro.fecha_asignacion as string)
        : null,
    }),
    [miembro]
  );

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
    validationSchema,
    enableReinitialize: true,
  });

  useEffect(() => {
    formik.setFieldValue("docente", acDocente?.id || -1);
  }, [acDocente]);

  useEffect(() => {
    if (isVisible) {
      if (miembro?.docente) {
        setACDocente(miembro.docente);
      }
    } else {
      setACDocente(null);
    }
  }, [isVisible]);

  const submitting = formik.isSubmitting;

  const handleReset = formik.handleReset;

  const handleCloseModal = () => {
    formik.resetForm();
    setACDocente(null);
    cleanErrorsSumary();
    closeModal();
  };

  const requeridoIA = useMemo(
    () => esRequeridoIA(formik.values.tipo),
    [formik.values.tipo]
  );

  useEffect(() => {
    if (!requeridoIA) formik.setFieldValue("informacion_adicional", "");
  }, [requeridoIA]);

  useEffect(() => {
    if (!isVisible) {
      formik.resetForm();
    }
  }, [isVisible]);

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
        title={isEditMode ? "Editar miembro" : "Agregar miembro"}
        onCancel={handleCloseModal}
        textApprove="Guardar"
        maxWidth="md"
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
                enableReinitialize: true,
                initValue: miembro?.docente,
              }}
              AutoCompleteProps={{
                id: "autocomplete-asistente-acta",
                disabled: submitting || isEditMode,
                isOptionEqualToValue: isOptionEqualToValueDocente,
                getOptionLabel: getOptionLabelDocente,
              }}
              TextFieldProps={{
                required: true,
                label: "Docente",
                placeholder: "Nombre",
                disabled: submitting || isEditMode,
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
              label="Documento de asignación"
              value={formik.values.informacion_adicional}
              placeholder="Memorando Nro. UTA-FISEI-2022-0001-M | Resolución 0001-P-CD-FISEI-UTA-2022"
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

          <Grid item xs={12}>
            <DatePicker
              views={CONSTANTS.DATEPICKER}
              disabled={submitting}
              label="Fecha asignación"
              value={formik.values.fecha_asignacion}
              onChange={(date) =>
                formik.setFieldValue("fecha_asignacion", date)
              }
              renderInput={(props) => (
                <TextField
                  {...props}
                  margin="normal"
                  fullWidth
                  error={
                    formik.touched.fecha_asignacion &&
                    Boolean(formik.errors.fecha_asignacion)
                  }
                  helperText={
                    formik.touched.fecha_asignacion &&
                    formik.errors.fecha_asignacion
                  }
                />
              )}
            />
          </Grid>

          {errorSummary && <ErrorSummary errors={errorSummary} />}
        </Grid>
      </ConfirmationDialog>
    </Box>
  );
};

export default AddAsistenteActa;
