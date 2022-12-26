import { GridFilterModel } from "@mui/x-data-grid";

export enum DataGridFilterModelKeys {
  "PLANTILLASACTAGRADO" = "DataGrid.filters.PlantillasActaGrado",
}

export function useDataGridFilterModel(key: DataGridFilterModelKeys) {
  const initialState = () => ({
    filter: {
      filterModel: {
        items: JSON.parse(localStorage.getItem(key) || "[]"),
      },
    },
  });

  const onFilterModelChange = (m: GridFilterModel) => {
    localStorage.setItem(key, JSON.stringify(m.items));
  };

  return {
    initialState,
    onFilterModelChange,
  };
}
