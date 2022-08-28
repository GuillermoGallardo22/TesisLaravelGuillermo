import axios from "axios";
import { IEstadoActa, IFilterPaginationProps } from "models/interfaces";
import { parseFilterPaginationProps } from "utils";

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
