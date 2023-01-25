import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useDeleteItem } from "hooks/useDeleteItem";
import { IDocumento } from "models/interfaces/IDocumento";
import { useQuery } from "react-query";
import { deleteDocumento, getDocumentos } from "services/documentos";

export function useListDocumentos(consejo: number) {
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
    documentos,
    loading,
    //
    confirmationDialog,
    deleteItem,
    refetch,
  };
}
