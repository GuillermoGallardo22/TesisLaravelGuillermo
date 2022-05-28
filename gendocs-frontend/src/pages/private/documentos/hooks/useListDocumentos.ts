import { useConfirmationDialog, useDeleteItem } from "hooks";
import { IDocumento } from "models/interfaces";
import { useQuery } from "react-query";
import { deleteDocumento, getDocumentos } from "services";

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
    documentos,
    loading,
    //
    confirmationDialog,
    deleteItem,
  };
}
