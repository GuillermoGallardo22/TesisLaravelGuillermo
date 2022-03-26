import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useDeleteItem } from "hooks/useDeleteItem";
import { useConsejos } from "hooks/useQuery";
import { IDocumento } from "models/interfaces";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { deleteDocumento, getDocumentos } from "services/documentos";

export function useListDocumentos() {
    const [consejo, setConsejo] = useState(-1);

    const { data: consejos = [] } = useConsejos();

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

    useEffect(() => {
        if (consejos.length) {
            setConsejo(consejos[0].id);
        }
    }, [consejos]);

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
