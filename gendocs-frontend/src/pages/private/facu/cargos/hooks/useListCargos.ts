import { ICargo } from "models/interfaces";
import { useQuery } from "react-query";
import { getCargos } from "services";

export function useListCargos() {
  const { data: cargos = [], isLoading } = useQuery<ICargo[]>(
    ["docentes"],
    () => getCargos()
  );

  return {
    cargos,
    isLoading,
  };
}
