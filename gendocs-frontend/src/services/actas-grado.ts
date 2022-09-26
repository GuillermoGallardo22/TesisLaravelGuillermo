import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
  IActaGrado,
  IFilterPaginationProps,
  IResponse,
} from "models/interfaces";
import { HTTP_MESSAGES, parseFilterPaginationProps } from "utils";

export async function getActasGrado(
  options?: IFilterPaginationProps
): Promise<IResponse<IActaGrado[]>> {
  try {
    const params = parseFilterPaginationProps(options);

    const {
      data: { data },
    } = await axios.get("actas-grados?" + params);

    return {
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
      data: data,
    };
  } catch (error) {
    return {
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
      data: [],
    };
  }
}
