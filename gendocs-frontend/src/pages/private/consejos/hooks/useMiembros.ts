import { HTTP_STATUS } from "models/enums";
import { ConsejoMiembroForm } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMiembros } from "services/miembros";
import { getConsejo } from "services/consejos";

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
