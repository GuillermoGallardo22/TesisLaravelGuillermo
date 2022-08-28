import axios from "axios";
import { IFilterPaginationProps, ITipoActaGrado } from "models/interfaces";
import { parseFilterPaginationProps } from "utils";

export async function getTipoActasGrado(
  props: IFilterPaginationProps
): Promise<ITipoActaGrado[]> {
  try {
    const params = parseFilterPaginationProps(props);

    const { data } = await axios.get(`tipo-actas-grado?${params}`);

    return data?.data;
  } catch (error) {
    return [];
  }
}
