export const VALIDATION_MESSAGES = {
    required: "Campo requerido.",
    invalidFormat: "Formato no válido.",
    maxLength: (length: number) => `Máximo ${length} caracteres.`,
    invalidOption: "Opción no válida.",
};

export const HTTP_MESSAGES = {
    200: "Solicitud procesada correctamente",
    201: "Registro creado correctamente",
    400: "Por favor verifique la información",
    422: "Los datos proporcionados no son válidos.",
    503: "No se pudo comunicar con el servidor, inténtelo más tarde",
};
