import { HTTP_STATUS } from "models/enums";
import { IResponse } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useState } from "react";

type useDeleteItemProps = {
    id: number | string | null | undefined;
    onDelete: (props: any) => Promise<IResponse<any>>;
    callback?: () => void;
};

export function useDeleteItem({ id, onDelete, callback }: useDeleteItemProps) {
    const [deleting, setDeleting] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = async () => {
        if (!id) return;

        setDeleting(true);

        const result = await onDelete(id);

        if (result.status === HTTP_STATUS.ok) {
            enqueueSnackbar(result.message, { variant: "success" });
        } else {
            const { errors, message } = result;

            enqueueSnackbar(errors?.length ? errors[0] : message, {
                variant: "error",
            });
        }

        if (callback) callback();

        setDeleting(false);
    };

    return {
        deleting,
        handleDelete,
    };
}
