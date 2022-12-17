import { EstadoActaEnum } from "models/enums/ActaGrado";

export const CONSTANTS = {
  EMAIL_UTA_REGEX: /^[^\s\\]*@uta\.edu\.ec$/gm,
  EMAIL_GMAIL_REGEX: /^[a-z0-9](\.?[a-z0-9]){3,}@g(oogle)?mail\.com$/gm,
  PHONE_REGEX: /^[0-9]+$/gm,
  PAGE_SIZE: 100,
  MAYOR_EDAD: 18,
  FORMATO_FECHA_NACIMIENTO: "Y-MM-d", // FECHA NACIMIENTO
  DURACION_ESTUDIOS: 5,
  HORAS_PRACTICAS: 0,
  COLORS: {
    [EstadoActaEnum.APRO]: "primary",
    [EstadoActaEnum.REPR]: "error",
    [EstadoActaEnum.NO_RESENTACION]: "warning",
  },
};
