import axios from "axios";
import { IAula } from "models/interfaces/IAula";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { parseFilterPaginationProps } from "utils/pagination";

export async function getAulas(
  props: IFilterPaginationProps
): Promise<IAula[]> {
  try {
    const params = parseFilterPaginationProps(props);

    const {
      data: { data },
    } = await axios.get(`aulas?${params}`);

    return data;
  } catch (error) {
    return [];
  }
}
