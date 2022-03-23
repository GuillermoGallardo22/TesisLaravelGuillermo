import { IFilterPaginationProps } from "models/interfaces";
import { useState } from "react";
import { useQuery } from "react-query";
import { getConsejos } from "services/consejos";
import { getDocumentos } from "services/documentos";

export function useListDocumentos() {
    const [consejo, setConsejo] = useState(-1);

    const { data: consejos = [] } = useQuery(["consejos"], () =>
        getConsejos({
            filters: {
                estado: 1,
            },
        }).then((r) => r.data)
    );

    const { data: documentos = [], isLoading: loading } = useQuery(
        ["documentos", consejo],
        () =>
            getDocumentos({
                filters: {
                    consejo,
                },
            }).then((r) => r.data)
    );

    return {
        consejos,
        setConsejo,
        documentos,
        consejo,
        loading,
    };
}
