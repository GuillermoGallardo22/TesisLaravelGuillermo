import axios from "axios";
import { ITipoActaGrado } from "models/interfaces/IActaGrado";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { parseFilterPaginationProps } from "utils/pagination";

export async function getTipoActasGrado(
  props?: IFilterPaginationProps
): Promise<ITipoActaGrado[]> {
  try {
    const params = parseFilterPaginationProps(props);

    const { data } = await axios.get(`tipo-actas-grado?${params}`);

    return data?.data;
  } catch (error) {
    return [];
  }
}
