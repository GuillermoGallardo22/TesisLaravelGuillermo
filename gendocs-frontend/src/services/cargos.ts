import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
  IAddCargo,
  ICargo,
  IFilterPaginationProps,
  IResponse,
  IUpdateCargo,
} from "models/interfaces";
import { handleErrors, HTTP_MESSAGES, parseFilterPaginationProps } from "utils";

export async function getCargos(
  props?: IFilterPaginationProps
): Promise<ICargo[]> {
  try {
    const params = parseFilterPaginationProps(props);

    const {
      data: { data },
    } = await axios.get(`cargos?${params}`);

    return data;
  } catch (error) {
    return [];
  }
}

export async function getCargo(cargoId: string): Promise<IResponse<ICargo>> {
  try {
    const {
      data: { data },
    } = await axios.get("cargos/" + cargoId);

    return {
      data,
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
    };
  } catch (error) {
    return handleErrors(error, null);
  }
}

export async function saveCargo(form: IAddCargo): Promise<IResponse<ICargo>> {
  try {
    const { data } = await axios.post("cargos", form);

    return {
      status: HTTP_STATUS.created,
      message: HTTP_MESSAGES[HTTP_STATUS.created],
      data,
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function updateCargo(
  cargoId: string,
  form: IUpdateCargo
): Promise<IResponse<ICargo>> {
  try {
    const { variable, ...rest } = form;
    const { data } = await axios.put("cargos/" + cargoId, rest);

    return {
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
      data,
    };
  } catch (error) {
    return handleErrors(error);
  }
}
