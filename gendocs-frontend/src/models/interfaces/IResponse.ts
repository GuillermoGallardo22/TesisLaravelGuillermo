import { HTTP_STATUS } from "../enums/";

export interface IResponse<T> {
    status: HTTP_STATUS,
    data: T,
    message: string | string[],
}
