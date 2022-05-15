import { useState } from "react";

export type ConfirmationDialogReturnProps<T> = {
  isVisible: boolean;
  openModal: (item: T) => void;
  closeModal: () => void;
  itemSelected: T | null;
  openJustModal: () => void;
};

export function useConfirmationDialog<T>(): ConfirmationDialogReturnProps<T> {
  const [isVisible, setIsVisible] = useState(false);

  const [itemSelected, setItemSelected] = useState<T | null>(null);

  const openModal = (item: T) => {
    setItemSelected(item);
    setIsVisible(true);
  };

  const openJustModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setTimeout(() => {
      setItemSelected(null);
    }, 500);
    setIsVisible(false);
  };

  return {
    isVisible,
    openModal,
    closeModal,
    itemSelected,
    openJustModal,
  };
}
