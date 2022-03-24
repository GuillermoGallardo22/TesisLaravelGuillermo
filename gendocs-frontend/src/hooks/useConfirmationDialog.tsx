import { useState } from "react";

export function useConfirmationDialog<T>() {
    const [isVisible, setIsVisible] = useState(false);

    const [itemSelected, setItemSelected] = useState<T | null>(null);

    const openModal = (item: T) => {
        setItemSelected(item);
        setIsVisible(true);
    };

    const closeModal = () => {
        setItemSelected(null);
        setIsVisible(false);
    };

    return {
        isVisible,
        openModal,
        closeModal,
        itemSelected,
    };
}
