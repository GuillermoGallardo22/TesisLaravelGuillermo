import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useDeleteItem } from "hooks/useDeleteItem";
import { IDocumento } from "models/interfaces";
import { useState } from "react";
import { useQuery } from "react-query";
import { getConsejos } from "services/consejos";
import { deleteDocumento, getDocumentos } from "services/documentos";

export function useListDocumentos() {
    const [consejo, setConsejo] = useState(-1);

    const { data: consejos = [] } = useQuery(
        ["consejos"],
        () =>
            getConsejos({
                filters: {
                    estado: 1,
                },
            }).then((r) => r.data),
        {
            onSuccess: (r) => {
                if (r.length) {
                    setConsejo(r[0].id);
                }
            },
        }
    );

    const {
        data: documentos = [],
        isLoading: loading,
        refetch,
    } = useQuery(
        ["documentos", consejo],
        () =>
            getDocumentos({
                filters: {
                    consejo,
                },
            }).then((r) => r.data),
        {
            refetchOnWindowFocus: false,
            enabled: consejo !== -1,
        }
    );

    const confirmationDialog = useConfirmationDialog<IDocumento>();

    const deleteItem = useDeleteItem({
        id: confirmationDialog.itemSelected?.id,
        onDelete: deleteDocumento,
        callback: () => {
            confirmationDialog.closeModal();
            refetch();
        },
    });

    return {
        consejos,
        setConsejo,
        documentos,
        consejo,
        loading,
        //
        confirmationDialog,
        deleteItem,
    };
}
