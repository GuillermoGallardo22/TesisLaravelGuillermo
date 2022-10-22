import axios from "axios";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import {
  IFilterPaginationProps,
  IPagination,
} from "models/interfaces/IPagination";
import { IProceso, IProcesoForm } from "models/interfaces/IProceso";
import { IResponse } from "models/interfaces/IResponse";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import {
  DEFAULT_PAGINATION_VALUES,
  parseFilterPaginationProps,
  parsePaginationData,
} from "utils/pagination";

export async function getProcesos(
  props: IFilterPaginationProps
): Promise<IPagination<IProceso>> {
  try {
    const params = parseFilterPaginationProps(props);

    const { data } = await axios.get(`procesos?${params}`);

    return parsePaginationData(data);
  } catch (error) {
    return DEFAULT_PAGINATION_VALUES;
  }
}

export async function saveProceso(
  form: IProcesoForm
): Promise<IResponse<IProceso>> {
  try {
    const { data } = await axios.post("procesos", form);
    return {
      status: HTTP_STATUS.created,
      data: data,
      message: HTTP_MESSAGES[201],
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function updateProceso(
  form: IProceso
): Promise<IResponse<IProceso>> {
  try {
    const {
      data: { data },
    } = await axios.put("procesos/" + form.id, form);
    return {
      status: HTTP_STATUS.ok,
      data: data,
      message: HTTP_MESSAGES[200],
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function getProcesoById(
  procesoId: number | string
): Promise<IResponse<IProceso>> {
  try {
    const { data } = await axios.get("procesos/" + procesoId);
    return {
      status: HTTP_STATUS.ok,
      data: data.data,
      message: "",
    };
  } catch (error) {
    return handleErrors(error);
  }
}
