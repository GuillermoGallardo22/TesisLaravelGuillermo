import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useDeleteItem } from "hooks/useDeleteItem";
import { ICeldaNota } from "models/interfaces/ICeldaNota";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { useQuery } from "react-query";
import { celdaNotas, deleteCeldaNota } from "services/celda-notas";

export function useCeldaNotas(
  props?: IFilterPaginationProps,
  callback?: () => void
) {
  const {
    data: celdasNotas = [],
    isLoading,
    refetch,
  } = useQuery<ICeldaNota[]>(
    ["celda-notas", props?.filters?.tipoActa],
    () => celdaNotas(props),
    {
      enabled: Boolean(props?.filters?.tipoActa),
    }
  );

  const confirmationDialog = useConfirmationDialog<ICeldaNota>();
  const deleteItem = useDeleteItem({
    id: confirmationDialog.itemSelected?.id,
    onDelete: deleteCeldaNota,
    callback: () => {
      if (callback) {
        callback();
      }
      confirmationDialog.closeModal();
      refetch();
    },
  });

  return {
    celdasNotas,
    isLoading,
    deleteItem,
    confirmationDialog,
  };
}
