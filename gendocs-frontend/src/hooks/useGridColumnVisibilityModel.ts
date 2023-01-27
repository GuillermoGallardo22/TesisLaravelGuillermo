import { GridColumnVisibilityModel } from "@mui/x-data-grid";
import { useState } from "react";

type useGridColumnVisibilityModelProps = {
  key:
    | "estudiantesTableModel"
    | "documentosTableModel"
    | "docentesTableModel"
    | "asistentesTableModel"
    | "consejo-resoluciones"
    | "buscar-resoluciones"
    | "table-model-users"
    | "table-cargos"
    | "actasGradoTableModel"
    | "asistentesActaGradoTableModel"
    | "reporteActasGradoTableModel";
};

export function useGridColumnVisibilityModel({
  key,
}: useGridColumnVisibilityModelProps) {
  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(
      JSON.parse(localStorage.getItem(key) || "{}")
    );

  const onColumnVisibilityModelChange = (model: GridColumnVisibilityModel) => {
    localStorage.setItem(key, JSON.stringify(model));
    setColumnVisibilityModel(model);
  };

  return {
    columnVisibilityModel,
    onColumnVisibilityModelChange,
  };
}
