import { IEstadoActa } from "models/interfaces/IActaGrado";
import { useQuery } from "react-query";
import { getEstadoActasGrado } from "services/estadoActasGrado";

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
