import axios from "axios";
import { ICanton, IFilterPaginationProps } from "models/interfaces";
import { parseFilterPaginationProps } from "utils";

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
