import { IEstadoActa } from "models/interfaces";
import { useQuery } from "react-query";
import { getEstadoActasGrado } from "services";

export function useEstadoActasList() {
  const { data: estadoActas = [], isLoading } = useQuery<IEstadoActa[]>(
    ["estado-actas"],
    () => getEstadoActasGrado()
  );

  return {
    estadoActas,
    isLoading,
  };
}
