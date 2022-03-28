import { HTTP_STATUS } from "models/enums";
import { useSnackbar } from "notistack";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getConsejo, getMiembros } from "services";

export function useMiembros() {
    const { consejoId = "" } = useParams<{ consejoId: string }>();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const { data: consejo } = useQuery(
        ["consejo"],
        () => getConsejo(consejoId),
        {
            onSuccess: (r) => {
                if (r.status !== HTTP_STATUS.ok) {
                    enqueueSnackbar(r.message, { variant: "warning" });
                    navigate(-1);
                }
            },
            // select: (r) => r.data,
        }
    );

    const { data: miembros = [], isLoading } = useQuery(
        ["consejos-miembros", consejoId],
        () =>
            getMiembros({
                filters: {
                    consejo: consejoId,
                },
            }),
        {
            enabled: Boolean(consejo?.data),
        }
    );

    return {
        miembros,
        isLoading,
        consejo: consejo?.data,
    };
}
