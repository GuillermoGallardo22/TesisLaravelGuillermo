import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import { Icon, LinearProgressWithLabel, Skeleton, TitleNav } from "components";
import { HTTP_STATUS } from "models/enums";
import { IActa, IConsejo } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createActa, descargarActa, getBatch, getConsejo } from "services";

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
  const [submitting, setSubmitting] = useState(false);

  const generateActa = () => {
    setSubmitting(true);
    createActa(consejo.id)
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
      .finally(() => setSubmitting(false));
  };

  //
  const [refetch, setRefetch] = useState(true);

  const { data: batch } = useQuery(
    ["batch", consejo.acta?.batch],
    () =>
      getBatch(consejo.acta?.batch || "").then((r) => {
        return r.data;
      }),
    {
      enabled: refetch && Boolean(consejo.acta),
      refetchInterval: 1500,
    }
  );

  useEffect(() => {
    if (!batch) {
      setRefetch(true);
      return;
    }
    if (batch && batch.pendingJobs === 0) {
      setRefetch(false);
    }
  }, [batch]);

  const generating = useMemo(
    (): boolean =>
      Boolean(consejo.acta) &&
      batch?.progress !== GenerationStates.COMPLETED &&
      !submitting,
    [batch?.progress, submitting]
  );

  const canDownloadActa = useMemo(
    () =>
      Boolean(
        !generating &&
          !submitting &&
          consejo.acta &&
          batch?.progress === GenerationStates.COMPLETED
      ),
    [batch, submitting, consejo.acta, generating]
  );

  return (
    <Stack spacing={2}>
      <TitleNav title="Generar acta" />

      <LoadingButton
        loading={generating || submitting}
        loadingPosition="center"
        startIcon={<Icon icon="add" />}
        onClick={generateActa}
        variant="outlined"
      >
        Generar acta
      </LoadingButton>

      {generating && <LinearProgressWithLabel value={batch?.progress || 0} />}

      {canDownloadActa && <DownloadActa acta={consejo.acta as IActa} />}
    </Stack>
  );
};

type DownloadActaProps = {
  acta: IActa;
};
const DownloadActa: React.FunctionComponent<DownloadActaProps> = ({ acta }) => {
  const [downloading, setDownloading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const _descargarActa = async () => {
    setDownloading(true);
    const result = await descargarActa(acta.id);

    if (result.status === HTTP_STATUS.ok) {
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }

    setDownloading(false);
  };

  return (
    <LoadingButton
      loading={downloading}
      loadingPosition="center"
      startIcon={<Icon icon="download" />}
      onClick={_descargarActa}
      variant="outlined"
      color="success"
    >
      Descargar acta
    </LoadingButton>
  );
};
