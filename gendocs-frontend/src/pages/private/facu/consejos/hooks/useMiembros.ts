import { HTTP_STATUS } from "models/enums/HttpStatus";
import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getConsejo } from "services/consejos";
import { getMiembros } from "services/miembros";

export function useMiembros() {
  const { consejoId = "" } = useParams<{ consejoId: string }>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data: consejo } = useQuery(["consejo"], () =>
    getConsejo(consejoId).then((r) => {
      if (r.status !== HTTP_STATUS.ok) {
        enqueueSnackbar(r.message, { variant: "warning" });
        navigate(-1);
      }

      return r.data;
    })
  );

  const { data: miembros = [], isLoading } = useQuery(
    ["consejos-miembros", consejo?.id],
    () =>
      getMiembros({
        filters: {
          consejo: consejoId,
        },
      }),
    {
      enabled: Boolean(consejo),
    }
  );

  return {
    miembros,
    isLoading,
    consejo: consejo,
  };
}
