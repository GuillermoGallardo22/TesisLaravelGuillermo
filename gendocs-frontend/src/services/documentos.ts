import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
  IDocumento,
  IDocumentoForm,
  IFilterPaginationProps,
  IPagination,
  IResponse,
} from "models/interfaces";
import {
  DEFAULT_PAGINATION_VALUES,
  handleErrors,
  HTTP_MESSAGES,
  parseFilterPaginationProps,
  parsePaginationData,
} from "utils";

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
