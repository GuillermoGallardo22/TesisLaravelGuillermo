import axios from "axios";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IAddCargo, ICargo, IUpdateCargo } from "models/interfaces/ICargo";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { IResponse } from "models/interfaces/IResponse";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import { parseFilterPaginationProps } from "utils/pagination";

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

export async function deleteCargo(id: string): Promise<IResponse<null>> {
  try {
    await axios.delete("cargos/" + id);

    return {
      data: null,
      status: HTTP_STATUS.ok,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
    };
  } catch (error) {
    return handleErrors(error);
  }
}
