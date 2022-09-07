import axios from "axios";
import { IAula, IFilterPaginationProps } from "models/interfaces";
import { parseFilterPaginationProps } from "utils";

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
