import axios from "axios";
import { HTTP_STATUS } from "models/enums";
import {
  IResponse,
  IRole,
  IUpdatePasswordForm,
  IUser,
  IUserForm,
} from "models/interfaces";
import {
  CUSTOM_HTTP_MESSAGES,
  deleteAllCookies,
  handleErrors,
  HTTP_MESSAGES,
} from "utils";

async function getCsrf() {
  try {
    await axios.get("csrf-cookie");
  } catch (error) {
    console.error({ error });
  }
}

export async function getUser(): Promise<IResponse<IUser>> {
  try {
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

export async function getRoles(): Promise<IRole[]> {
  try {
    const { data } = await axios.get("/roles");

    return data.map(({ id, name }: { id: number; name: string }) => ({
      id,
      nombre: name,
    }));
  } catch (error) {
    return [];
  }
}

export async function getUserById(userId: string): Promise<IResponse<IUser>> {
  try {
    const {
      data: { data },
    } = await axios.get(`/user/${userId}`);

    return {
      data: data,
      message: HTTP_MESSAGES[200],
      status: HTTP_STATUS.ok,
    };
  } catch (error) {
    return handleErrors(error, {} as IUser);
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

export async function updateUser(form: IUserForm): Promise<IResponse<IUser>> {
  try {
    const payload = form;

    const {
      data: { data },
    } = await axios.put("/user/" + form.id, payload);

    return {
      data: data,
      message: HTTP_MESSAGES[200],
      status: HTTP_STATUS.ok,
    };
  } catch (error) {
    return handleErrors(error, {} as IUser);
  }
}

export async function updateProfile(form: IUser): Promise<IResponse<IUser>> {
  try {
    const payload = {
      nombre: form.name,
    };

    const {
      data: { data },
    } = await axios.put("/user/profile", payload);

    return {
      data: data,
      message: HTTP_MESSAGES[200],
      status: HTTP_STATUS.ok,
    };
  } catch (error) {
    return handleErrors(error, {} as IUser);
  }
}

export async function updatePassword(
  form: IUpdatePasswordForm
): Promise<IResponse<null>> {
  try {
    const payload = {
      current_password: form.currentPassword,
      password: form.newPassword,
      password_confirmation: form.confirmPassword,
    };

    await axios.put("/user/password", payload);

    return {
      data: null,
      message: HTTP_MESSAGES[200],
      status: HTTP_STATUS.ok,
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

export async function resetUserPassword(
  email: string
): Promise<IResponse<null>> {
  try {
    await axios.post("user/reset-password", {
      email,
    });

    return {
      data: null,
      message: CUSTOM_HTTP_MESSAGES.AUTH_RESE_PASS_SUCC,
      status: HTTP_STATUS.ok,
    };
  } catch (error) {
    return handleErrors(error);
  }
}
