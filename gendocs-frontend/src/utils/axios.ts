import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { IResponse } from "models/interfaces";
import { HTTP_MESSAGES } from "./messages";

const BASE_PATH = "http://localhost:80/api";

export const initAxios = () => {
    // axios.defaults.withCredentials = true;
    axios.defaults.baseURL = BASE_PATH;
};

export function handleErrors<T>(error: any, options?: {
    defaultValues: {
        data?: T,
        message?: string,
    }
}): IResponse<T> {

    if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        const { data, status } = error.response;

        let message: string | string[] | undefined;

        if (data?.errors) {
            const { errors } = data.errors;
            message = [""].concat(...Object.values<string[]>(errors || []));
        }

        return {
            status: status,
            data: options?.defaultValues?.data || {} as T,
            message: options?.defaultValues?.message || message || "",
        };
    } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        return {
            status: HTTP_STATUS.unprocessableEntity,
            data: options?.defaultValues?.data || {} as T,
            message: options?.defaultValues?.message || HTTP_MESSAGES[503] || "",
        };
    } else {
        // Something happened in setting up the request and triggered an Error
        return {
            status: HTTP_STATUS.badRequest,
            data: options?.defaultValues?.data || {} as T,
            message: options?.defaultValues?.message || HTTP_MESSAGES[503] || "",
        };
    }
}
