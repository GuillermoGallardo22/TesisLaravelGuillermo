import { HTTP_STATUS } from "models/enums/HttpStatus";

export interface IResponse<T> {
  status: HTTP_STATUS;
  data: T;
  message: string;
  errors?: string[];
}
