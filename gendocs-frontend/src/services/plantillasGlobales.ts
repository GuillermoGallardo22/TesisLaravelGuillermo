import axios from "axios";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { IPlantillaGlobal } from "models/interfaces/IPlantillaGlobal";
import { parseFilterPaginationProps } from "utils/pagination";

export async function getPlantillaGlobalByCode(
  props: IFilterPaginationProps
): Promise<IPlantillaGlobal | null> {
  try {
    const params = parseFilterPaginationProps(props);

    const {
      data: { data = [] },
    } = await axios.get(`plantillas-globales?${params}`);

    return data.length ? data[0] : null;
  } catch (error) {
    return null;
  }
}
