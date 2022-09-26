import { ITipoActaGrado } from "models/interfaces";
import { useQuery } from "react-query";
import { getTipoActasGrado } from "services";

export function useTipoActasList() {
  const { data: tiposActas = [], isLoading } = useQuery<ITipoActaGrado[]>(
    ["tipo-actas"],
    () => getTipoActasGrado()
  );

  return {
    tiposActas,
    isLoading,
  };
}
