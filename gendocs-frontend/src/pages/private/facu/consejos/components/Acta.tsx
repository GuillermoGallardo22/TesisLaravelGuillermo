import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {
  ConfirmationDialog,
  Icon,
  LinearProgressWithLabel,
  Skeleton,
  TitleNav,
} from "components";
import { useConfirmationDialog } from "hooks";
import { HTTP_STATUS } from "models/enums";
import { IActa, IConsejo } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createActa as procesarDocumentos,
  createPlantillaActa as crearPlantillaActa,
  descargarActa,
  getActaById,
  getBatch,
  getConsejo,
} from "services";

export default function Acta() {
  const { consejoId = "" } = useParams<{ consejoId: string }>();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data: consejo, isLoading } = useQuery(
    ["consejo", { id: +consejoId }],
    () =>
      getConsejo(consejoId).then((r) => {
        if (r.status !== HTTP_STATUS.ok) {
          enqueueSnackbar(r.message, { variant: "warning" });
          navigate(-1);
        }

        return r.data;
      })
  );

  if (isLoading || !consejo) return <Skeleton />;

  return <ActaBase consejo={consejo} />;
}

enum GenerationStates {
  COMPLETED = 100,
}

type ActaBaseProps = {
  consejo: IConsejo;
};

export const ActaBase: React.FunctionComponent<ActaBaseProps> = ({
  consejo,
}) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const [processing, setProcessing] = useState(false);
  const [generatingPlantilla, setGeneratingPlantilla] = useState(false);
  const [enableRefetchBatch, setEnableRefetchBatch] = useState(false);
  const [wasApproved, setWasApproved] = useState(false);

  const { openJustModal, isVisible, closeModal } = useConfirmationDialog();

  const procesarDocumentosActa = () => {
    setProcessing(true);
    procesarDocumentos(consejo.id)
      .then((result) => {
        if (result.status === HTTP_STATUS.created) {
          queryClient.invalidateQueries(["consejo", { id: consejo.id }]);
          enqueueSnackbar(result.message, { variant: "success" });
        } else {
          //
          enqueueSnackbar(result.errors ? result.errors[0] : result.message, {
            variant: "error",
          });
        }
      })
      .finally(() => setProcessing(false));
  };

  const generatePlantillaActa = () => {
    if (!acta) return;
    if (acta.drive && !wasApproved) {
      openJustModal();
      return;
    }
    if (!acta.drive) {
      setWasApproved(true);
      return;
    }
  };

  const { data: acta } = useQuery(
    ["acta", { batch_id: consejo.acta?.batch }],
    () =>
      getActaById(consejo.acta?.id as number).then((r) => {
        if (r.data.batch.progress !== GenerationStates.COMPLETED)
          setEnableRefetchBatch(true);
        return r.data;
      }),
    {
      enabled: Boolean(consejo.acta),
    }
  );

  const { data: batch, isLoading: loadingBatch } = useQuery(
    ["batch", { id: acta?.batch.id }],
    () =>
      getBatch(acta?.batch.id as string).then((r) => {
        if (r.data.progress === GenerationStates.COMPLETED)
          setEnableRefetchBatch(false);
        return r.data;
      }),
    {
      enabled: enableRefetchBatch && Boolean(acta),
      refetchInterval: 1500,
    }
  );

  const generating = useMemo(
    (): boolean =>
      Boolean(batch && batch.progress !== GenerationStates.COMPLETED),
    [batch]
  );

  const canSeeActa = useMemo(
    (): boolean => Boolean(acta?.drive) && !generatingPlantilla,
    [acta, generatingPlantilla]
  );

  useEffect(() => {
    if (!wasApproved) return;
    if (!acta) return;

    setWasApproved(false);

    setGeneratingPlantilla(true);
    crearPlantillaActa(acta.id)
      .then((result) => {
        if (result.status === HTTP_STATUS.ok) {
          queryClient.invalidateQueries([
            "acta",
            { batch_id: consejo.acta?.batch },
          ]);
          enqueueSnackbar(result.message, { variant: "success" });
        } else {
          enqueueSnackbar(result.message, {
            variant: "error",
          });
        }
      })
      .finally(() => {
        setGeneratingPlantilla(false);
      });
  }, [isVisible, wasApproved]);

  const canProcesarGenerarActa = useMemo(() => consejo.estado, [consejo]);

  return (
    <>
      <Stack spacing={2}>
        <TitleNav title="Acta" />

        <Box>
          <Grid container columns={{ xs: 1, sm: 2 }} spacing={2}>
            <Grid item xs={1}>
              <LoadingButton
                fullWidth
                loading={generating || processing}
                disabled={!canProcesarGenerarActa}
                startIcon={<Icon icon="settings" />}
                onClick={procesarDocumentosActa}
                variant="outlined"
              >
                Procesar documentos
              </LoadingButton>
            </Grid>
            <Grid item xs={1}>
              <LoadingButton
                fullWidth
                disabled={!acta || !canProcesarGenerarActa}
                loading={generatingPlantilla}
                startIcon={<Icon icon="settings" />}
                onClick={generatePlantillaActa}
                variant="outlined"
              >
                Generar plantilla acta
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>

        {generating && (
          <Box>
            <LinearProgressWithLabel value={batch?.progress || 0} />
          </Box>
        )}

        <DownloadActa
          acta={acta}
          disabled={processing || generating || loadingBatch}
        />

        <Button
          fullWidth
          component={Link}
          to={"drive/" + acta?.drive}
          disabled={!canSeeActa}
          startIcon={<Icon icon="article" />}
          variant="outlined"
        >
          Ver Acta
        </Button>
      </Stack>

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
          ¿Está seguro que desea volver a generar la plantilla del acta?, esta
          acción sobreescribe la plantilla actualmente generada
        </DialogContentText>
      </ConfirmationDialog>
    </>
  );
};

type DownloadActaProps = {
  acta: IActa | undefined;
  disabled: boolean;
};
const DownloadActa: React.FunctionComponent<DownloadActaProps> = ({
  acta,
  disabled,
}) => {
  const [downloading, setDownloading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const _descargarActa = async () => {
    if (!acta) return;

    setDownloading(true);
    const result = await descargarActa(acta.id);

    if (result.status === HTTP_STATUS.ok) {
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }

    setDownloading(false);
  };

  const canDownloadActa = useMemo(
    () => Boolean(acta) && !disabled,
    [acta, disabled]
  );

  return (
    <LoadingButton
      disabled={!canDownloadActa}
      loading={downloading}
      // loadingPosition="center"
      startIcon={<Icon icon="download" />}
      onClick={_descargarActa}
      variant="outlined"
      color="success"
    >
      Descargar documentos
    </LoadingButton>
  );
};
