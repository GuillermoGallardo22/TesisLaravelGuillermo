import axios from "axios";
import { ICanton } from "models/interfaces/ICanton";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { parseFilterPaginationProps } from "utils/pagination";

export async function getCantones(
  props: IFilterPaginationProps
): Promise<ICanton[]> {
  try {
    const params = parseFilterPaginationProps(props);

    const { data } = await axios.get<ICanton[]>(`cantones?${params}`);

    return data;
  } catch (error) {
    return [];
  }
}
