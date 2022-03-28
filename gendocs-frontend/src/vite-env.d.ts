/// <reference types="vite/client" />

import { ArraySchema } from "yup";

declare module "yup" {
  interface ArraySchema<T> {
    unique(message: string, fn: (this: T, ...args: any[]) => T): ArraySchema<T>;
  }
}
