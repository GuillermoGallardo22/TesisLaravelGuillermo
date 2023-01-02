import axios from "axios";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { DocenteForm, IDocente, IUpdateDocente } from "models/interfaces/IDocente";
import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { IResponse } from "models/interfaces/IResponse";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";
import { parseFilterPaginationProps } from "utils/pagination";
import { CONSTANTS } from "utils/constants";



export async function saveDocente(
  form: DocenteForm
): Promise<IResponse<IDocente>> {
  try {
    const {  genero, ...rest } = form;

    const payload = {
      type: "simple",
      ...rest,
      genero: genero === -1 ? "" : genero,
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
  form: IUpdateDocente
): Promise<IResponse<IDocente>> {
  try {
    const { carrera, genero, ...rest } = form;

    const payload = {
      ...rest,
      genero: genero === -1 ? "" : genero,
      carrera_id: carrera,
    };

    const {
      data: { data },
    } = await axios.put("docentes/" + form.id, payload);

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

    const {
      data: { data },
    } = await axios.get(`docentes?${params}`);

    return data;
  } catch (error) {
    return [];
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


export async function getDocenteById(
  docenteId: string | number
): Promise<IResponse<IDocente>> {
  try {
    const {
      data: { data },
    } = await axios.get("docentes/" + docenteId);
    return {
      status: HTTP_STATUS.ok,
      data: {
        ...data,
        celular: data?.celular || "",
        correo_uta: data?.correo_uta || "",
        carrera: data?.carrera || "",
        telefono: data?.telefono || "",
        correo: data?.correo || "",
        genero: data?.genero || "",
      },
      message: "",
    };
  } catch (error) {
    return handleErrors(error);
  }
}

