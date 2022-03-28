export const VALIDATION_MESSAGES = {
  required: "Campo requerido.",
  invalidFormat: "Formato no válido.",
  minLength: (length: number) => `Mínimo ${length} caracteres.`,
  maxLength: (length: number) => `Máximo ${length} caracteres.`,
  invalidOption: "Opción no válida.",
  invalidDate: "Fecha no válida.",
  ciDuplicated: "Existen uno o más números de cédulas duplicadas.",
  passwordConfirmation: "Las contraseñas deben coincidir.",
  consejoNumeracion:
    "Al consejo seleccionado no se le puede asignar la numeración deseda",
};

export const HTTP_MESSAGES: { [code: number]: string } = {
  200: "Solicitud procesada correctamente",
  201: "Registro creado correctamente",
  401: "No se encuentra autenticado",
  403: "Permisos insuficientes para realizar esta acción",
  400: "Por favor verifique la información",
  404: "No se pudo encontrar el recurso solicitado",
  422: "Los datos proporcionados no son válidos",
  500: "Se produjo un error al intentar procesar su solicitud",
  503: "No se pudo comunicar con el servidor, inténtelo más tarde",
};
