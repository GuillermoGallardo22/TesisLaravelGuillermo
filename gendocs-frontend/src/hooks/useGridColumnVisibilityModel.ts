import { GridColumnVisibilityModel } from "@mui/x-data-grid";
import { useState } from "react";
import { getDocumentosTableModel, getEstudiantesTableModel } from "utils/libs";

type useGridColumnVisibilityModelProps = {
    key: "estudiantesTableModel" | "documentosTableModel";
    // defaultValues: (key: string) => GridColumnVisibilityModel;
};

export function useGridColumnVisibilityModel({
    key,
}: // defaultValues,
useGridColumnVisibilityModelProps) {
    const getDefaultValues = () => {
        switch (key) {
            case "documentosTableModel":
                return getDocumentosTableModel(key);
            case "estudiantesTableModel":
                return getEstudiantesTableModel(key);
            default:
                return {};
        }
    };

    const [columnVisibilityModel, setColumnVisibilityModel] =
        useState<GridColumnVisibilityModel>(getDefaultValues());

    const onColumnVisibilityModelChange = (
        model: GridColumnVisibilityModel
    ) => {
        localStorage.setItem(key, JSON.stringify(model));
        setColumnVisibilityModel(model);
    };

    return {
        columnVisibilityModel,
        onColumnVisibilityModelChange,
    };
}
