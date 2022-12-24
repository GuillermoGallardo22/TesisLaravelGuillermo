import { LoadingButton } from "@mui/lab";
import { Alert, DialogContentText } from "@mui/material";
import { Box, Stack } from "@mui/system";
import ConfirmationDialog from "components/ConfirmationDialog";
import DriveTemplate from "components/DriveTemplate";
import Icon from "components/Icon";
import Skeleton from "components/Skeleton";
import TitleNav from "components/TitleNav";
import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useHandleResult } from "hooks/useHandleResult";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IActaGrado } from "models/interfaces/IActaGrado";
import { useEffect, useState } from "react";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
import { useParams } from "react-router-dom";
import { generarDocumentoActaGrado } from "services/actas-grado";
import useActaGrado from "../hooks/useActaGrado";

const DocumentoActaGrado = () => {
  const { actaGradoId = "" } = useParams();

  const { actaGrado, isLoadingActaGrado, refetch } = useActaGrado({
    actaGradoId,
    options: undefined,
    props: {
      withMiembros: false,
    },
  });

  return (
    <Stack spacing={2}>
      <TitleNav title="Documento" goback />

      {!actaGrado || isLoadingActaGrado ? (
        <Skeleton />
      ) : (
        <DocumentoActaGradoBase actaGrado={actaGrado} refetch={refetch} />
      )}
    </Stack>
  );
};

type DocumentoActaGradoBaseProps = {
  actaGrado: IActaGrado;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<IActaGrado, unknown>>;
};

const DocumentoActaGradoBase: React.FunctionComponent<
  DocumentoActaGradoBaseProps
> = ({ actaGrado, refetch }) => {
  const [generating, setGenerating] = useState(false);
  const [wasApproved, setWasApproved] = useState(false);
  const { openJustModal, isVisible, closeModal } = useConfirmationDialog();
  const { handleResult } = useHandleResult();

  const process = async () => {
    if (actaGrado.documento && !wasApproved) {
      openJustModal();
      return;
    }

    setGenerating(true);

    const result = await generarDocumentoActaGrado(actaGrado.id);

    handleResult({
      result: result,
      status: HTTP_STATUS.ok,
    });

    refetch();

    setGenerating(false);
    setWasApproved(false);
  };

  useEffect(() => {
    if (!wasApproved) return;

    setWasApproved(false);

    process();
  }, [isVisible, wasApproved]);

  const invalidActa = Boolean(
    !actaGrado.estado_acta_id || !actaGrado.tipo_acta_id
  );

  return (
    <Stack spacing={2}>
      <Box>
        <LoadingButton
          fullWidth
          loading={generating}
          disabled={generating || invalidActa}
          startIcon={<Icon icon="settings" />}
          onClick={process}
          variant="outlined"
        >
          Generar acta de grado
        </LoadingButton>
      </Box>

      {invalidActa && (
        <Alert severity="warning">
          El acta de grado actual aún no tiene un estado o tipo asignado
        </Alert>
      )}

      {actaGrado.documento && !generating && (
        <DriveTemplate withTitle={false} driveId={actaGrado.documento} />
      )}

      <ConfirmationDialog
        id="regenerate-template-acta-modal"
        keepMounted={true}
        isVisible={isVisible}
        title="Advertencia"
        onCancel={() => {
          setWasApproved(false);
          closeModal();
        }}
        onApprove={() => {
          setWasApproved(true);
          closeModal();
        }}
        buttonColorApprove="error"
      >
        <DialogContentText>
          ¿Está seguro que desea volver a generar el documento?, esta acción
          sobreescribe el documento generado actualmente
        </DialogContentText>
      </ConfirmationDialog>
    </Stack>
  );
};

export default DocumentoActaGrado;
