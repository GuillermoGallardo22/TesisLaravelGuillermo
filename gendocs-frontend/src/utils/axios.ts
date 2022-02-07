import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { IResponse } from "models/interfaces";
import { HTTP_MESSAGES } from "./messages";

const PROTOCOL = "http";
const DOMAIN = "localhost";
const PORT = "80";

const API = "api";

const BASE_PATH = `${PROTOCOL}://${DOMAIN}:${PORT}`;

axios.defaults.withCredentials = true;

export const initAxios = (mode: "api" | "base") => {
    axios.defaults.baseURL = mode === "api" ? `${BASE_PATH}/${API}` : BASE_PATH;
};

export function handleErrors<T>(error: any, defaultValues?: any): IResponse<T> {
    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        const { data, status } = error.response;

        let message: string | string[] | undefined;

        if (data?.errors) {
            message = [""]
                .concat(...Object.values<string[]>(data.errors.errors || {}))
                .filter((i) => i);
        }

        if (!message || message.length <= 0) {
            message = HTTP_MESSAGES[status] || HTTP_MESSAGES[503];
        }

        return {
            status: status,
            data: defaultValues,
            message: message || HTTP_MESSAGES[503],
        };
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        return {
            status: HTTP_STATUS.unprocessableEntity,
            data: defaultValues,
            message: HTTP_MESSAGES[503] || "",
        };
    } else {
        // Something happened in setting up the request and triggered an Error
        return {
            status: HTTP_STATUS.serviceUnavailable,
            data: defaultValues,
            message: HTTP_MESSAGES[503] || "",
        };
    }
}
