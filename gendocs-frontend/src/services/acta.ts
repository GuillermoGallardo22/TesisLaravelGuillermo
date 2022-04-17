import axios from "axios";
import { saveAs } from "file-saver";
import { HTTP_STATUS } from "models/enums";
import { IBatch, IResponse } from "models/interfaces";
import { handleErrors, HTTP_MESSAGES } from "utils";

interface IActa {
  id: number;
  consejo: number;
  batch: IBatch;
}

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
