import axios from "axios";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IDocumento, IDocumentoForm } from "models/interfaces/IDocumento";
import {
  IFilterPaginationProps,
  IPagination,
} from "models/interfaces/IPagination";
import { IResponse } from "models/interfaces/IResponse";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import {
  DEFAULT_PAGINATION_VALUES,
  parseFilterPaginationProps,
  parsePaginationData,
} from "utils/pagination";

export async function saveDocumento(
  form: IDocumentoForm
): Promise<IResponse<null>> {
  try {
    await axios.post("documentos", form);

    return {
      status: HTTP_STATUS.created,
      message: HTTP_MESSAGES[201],
      data: null,
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function getDocumentos(
  props?: IFilterPaginationProps
): Promise<IPagination<IDocumento>> {
  try {
    const params = parseFilterPaginationProps(props);

    const { data } = await axios.get(`documentos?${params}`);

    return parsePaginationData(data);
  } catch (error) {
    return DEFAULT_PAGINATION_VALUES;
  }
}

export async function filterDocumentos(
  props?: IFilterPaginationProps
): Promise<IPagination<IDocumento>> {
  try {
    if (!(props?.filters?.estudiante as string).length) {
      return DEFAULT_PAGINATION_VALUES;
    }

    const params = parseFilterPaginationProps(props);

    const { data } = await axios.get(`documentos?${params}`);

    return parsePaginationData(data);
  } catch (error) {
    return DEFAULT_PAGINATION_VALUES;
  }
}

export async function deleteDocumento(
  id: string | number
): Promise<IResponse<null>> {
  try {
    await axios.delete("documentos/" + id);

    return {
      data: null,
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[200],
    };
  } catch (error) {
    return handleErrors(error);
  }
}
