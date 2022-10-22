import axios from "axios";
import { IEstadoActa } from "models/interfaces/IActaGrado";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { parseFilterPaginationProps } from "utils/pagination";

export async function getEstadoActasGrado(
  props?: IFilterPaginationProps
): Promise<IEstadoActa[]> {
  try {
    const params = parseFilterPaginationProps(props);

    const { data } = await axios.get(`estado-actas-grado?${params}`);

    return data?.data || [];
  } catch (error) {
    return [];
  }
}
