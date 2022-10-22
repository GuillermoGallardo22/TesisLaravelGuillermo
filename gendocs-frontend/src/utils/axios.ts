import axios from "axios";
import { HTTP_STATUS } from "models/enums/HttpStatus";
import { IResponse } from "models/interfaces/IResponse";
import { HTTP_MESSAGES } from "./messages";

const API_PATH = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;
axios.defaults.baseURL = API_PATH;

axios.interceptors.response.use(
  (r) => r,
  (e) => {
    if (e.response.status === HTTP_STATUS.unauthorized) {
      deleteAllCookies();
      const paths = window.location.pathname.split("/").filter((p) => p);
      if (paths.length && !paths.includes("login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(e);
  }
);

export function handleErrors<T>(error: any, defaultValues?: any): IResponse<T> {
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    const { data, status } = error.response;

    let errors: string[] = [];
    const message = HTTP_MESSAGES[status] || HTTP_MESSAGES[503];

    if (data?.errors) {
      const _errors = data.errors;

      if (typeof _errors === "string") {
        errors = [_errors];
      } else {
        errors = [""]
          .concat(...Object.values<string[]>(_errors || {}))
          .filter((i) => i);
      }
    }

    return {
      status: status,
      data: defaultValues,
      message: message,
      errors,
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
      message: HTTP_MESSAGES[503],
    };
  } else {
    // Something happened in setting up the request and triggered an Error
    return {
      status: HTTP_STATUS.serviceUnavailable,
      data: defaultValues,
      message: HTTP_MESSAGES[503],
    };
  }
}

export function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
