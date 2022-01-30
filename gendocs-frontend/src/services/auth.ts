import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { IResponse, IUser } from "models/interfaces";
import { initAxios, handleErrors } from "utils/axios";

async function getCsrf() {
    initAxios("base");
    try {
        await axios.get("/sanctum/csrf-cookie");
    } catch (error) {
        console.error({ error });
    }
    initAxios("api");
}

export async function getUser(): Promise<IResponse<IUser>> {
    try {

        initAxios("api");

        const { data } = await axios.get("/user");

        return {
            data: data,
            message: "",
            status: HTTP_STATUS.ok,
        };
    } catch (error) {
        return handleErrors(error, {} as IUser);
    }
}

export async function login(email: string, password: string): Promise<IResponse<IUser>> {
    try {

        const payload = { email, password };

        await getCsrf();

        await axios.post("/login", payload);

        return await getUser();

    } catch (error) {
        return handleErrors(error, {} as IUser);
    }
}

export async function logout(): Promise<IResponse<boolean>> {
    try {
        await axios.post("/logout");

        deleteAllCookies();

        return {
            data: true,
            message: "",
            status: HTTP_STATUS.ok
        };
    } catch (error) {

        deleteAllCookies();

        return {
            data: true,
            message: "",
            status: HTTP_STATUS.ok
        };
    }
}

function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
