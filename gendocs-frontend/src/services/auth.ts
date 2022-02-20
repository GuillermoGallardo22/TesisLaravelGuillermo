import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import { IResponse, IRole, IUser, IUserForm } from "models/interfaces";
import { handleErrors, initAxios } from "utils/axios";
import { HTTP_MESSAGES } from "utils/messages";

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

        const {
            data: { data },
        } = await axios.get("/me");

        return {
            data: data,
            message: "",
            status: HTTP_STATUS.ok,
        };
    } catch (error) {
        deleteAllCookies();

        return handleErrors(error, {} as IUser);
    }
}

export async function login(
    email: string,
    password: string
): Promise<IResponse<IUser>> {
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
            status: HTTP_STATUS.ok,
        };
    } catch (error) {
        deleteAllCookies();

        return {
            data: true,
            message: "",
            status: HTTP_STATUS.ok,
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

export async function getRoles(): Promise<IRole[]> {
    try {
        const {
            data: { data },
        } = await axios.get("/roles");

        return data.map(({ id, name }: { id: number; name: string }) => ({
            id,
            nombre: name,
        }));
    } catch (error) {
        return [];
    }
}

export async function createUser(form: IUserForm): Promise<IResponse<IUser>> {
    try {
        const payload = form;

        const {
            data: { data },
        } = await axios.post("/user", payload);

        return {
            data: data,
            message: HTTP_MESSAGES[201],
            status: HTTP_STATUS.created,
        };
    } catch (error) {
        return handleErrors(error, {} as IUser);
    }
}

export async function getUsers(): Promise<IUser[]> {
    try {
        const {
            data: { data },
        } = await axios.get("/user");

        return data;
    } catch (error) {
        return [];
    }
}
