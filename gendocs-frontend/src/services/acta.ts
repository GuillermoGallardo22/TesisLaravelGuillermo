import axios from "axios";
import { saveAs } from "file-saver";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IActa } from "models/interfaces/IConsejo";
import { IResponse } from "models/interfaces/IResponse";
import { handleErrors } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";

export async function createActa(
  consejoId: string | number
): Promise<IResponse<IActa>> {
  try {
    const {
      data: { data },
    } = await axios.post("actas", { consejo: consejoId });

    return {
      data: data,
      message: HTTP_MESSAGES[HTTP_STATUS.created],
      status: HTTP_STATUS.created,
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function createPlantillaActa(
  actaId: string | number
): Promise<IResponse<IActa>> {
  try {
    const {
      data: { data },
    } = await axios.put(`actas/${actaId}/plantilla`);

    return {
      data: data,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
      status: HTTP_STATUS.ok,
    };
  } catch (error) {
    return handleErrors(error);
  }
}

export async function descargarActa(
  actaId: number
): Promise<IResponse<boolean>> {
  try {
    const { data, headers } = await axios.get(
      "actas/" + actaId + "/descargar",
      {
        responseType: "blob",
      }
    );

    saveAs(data, headers["content-disposition"].split("filename=").pop());

    return {
      data: true,
      message: HTTP_MESSAGES[HTTP_STATUS.ok],
      status: HTTP_STATUS.ok,
    };
  } catch (error) {
    console.error(error);
    return handleErrors(error, false);
  }
}

export async function getActaById(
  actaId: number | string
): Promise<IResponse<IActa>> {
  try {
    const { data } = await axios.get("actas/" + actaId);
    return {
      status: HTTP_STATUS.ok,
      data: data.data,
      message: "",
    };
  } catch (error) {
    return handleErrors(error);
  }
}
