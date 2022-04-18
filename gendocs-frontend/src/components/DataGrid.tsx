import { DataGrid as DataGridBase, DataGridProps } from "@mui/x-data-grid";
import { ROW_PER_PAGE } from "utils";

export const DataGrid: React.FunctionComponent<DataGridProps> = ({
  ...props
}) => {
  return <DataGridBase rowsPerPageOptions={ROW_PER_PAGE} {...props} />;
};
