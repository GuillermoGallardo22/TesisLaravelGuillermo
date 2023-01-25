import axios from "axios";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { DocenteForm, IDocente } from "models/interfaces/IDocente";
import { IFilterPaginationProps, IPagination } from "models/interfaces/IPagination";
import { IResponse } from "models/interfaces/IResponse";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import { DEFAULT_PAGINATION_VALUES, parseFilterPaginationProps, parsePaginationData } from "utils/pagination";

export async function saveDocente(
  form: DocenteForm
): Promise<IResponse<IDocente>> {
  try {
    const payload = {
      type: "simple",
      ...form,
    };

    const {
      data: { data },
    } = await axios.post("docentes", payload);

    return {
      status: HTTP_STATUS.created,
      data: data,
      message: HTTP_MESSAGES[201],
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function updateDocente(
  form: IDocente
): Promise<IResponse<IDocente>> {
  try {
    const {
      data: { data },
    } = await axios.put("docentes/" + form.id, form);

    return {
      status: HTTP_STATUS.ok,
      data: data,
      message: HTTP_MESSAGES[200],
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function getDocentes(
  props?: IFilterPaginationProps
): Promise<IDocente[]> {
  try {
    const params = parseFilterPaginationProps(props);

    // const { data } = await axios.get<IPagination<IDocente>>(
    //   `docentes?${params}`
    // );

    const {
      data: { data },
    } = await axios.get(`docentes?${params}`);

     return data;
    // return parsePaginationData(data);
    
  } catch (error) {
    // return DEFAULT_PAGINATION_VALUES;
    return [];
  }
}

export async function getDocentesTabla(
  props?: IFilterPaginationProps
): Promise<IPagination<IDocente>> {
  try {
    const params = parseFilterPaginationProps(props);

    const { data } = await axios.get<IPagination<IDocente>>(
      `docentes?${params}`
    );

    // const {
    //   data: { data },
    // } = await axios.get(`docentes?${params}`);

    // return data;
    return parsePaginationData(data);
    
  } catch (error) {
    return DEFAULT_PAGINATION_VALUES;
  }
}

export async function getDocente(
  docenteId: string
): Promise<IResponse<IDocente>> {
  try {
    const {
      data: { data },
    } = await axios.get("docentes/" + docenteId);

    return {
      data,
      message: "",
      status: HTTP_STATUS.ok,
    };
  } catch (error) {
    return handleErrors(error, null);
  }
}
