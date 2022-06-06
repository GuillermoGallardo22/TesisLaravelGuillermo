import { IDocente } from "models/interfaces";
import { useQuery } from "react-query";
import { getDocentes } from "services";

export function useListDocentes() {
  const { data: docentes = [], isLoading } = useQuery<IDocente[]>(
    ["docentes"],
    () => getDocentes()
  );

  return {
    docentes,
    isLoading,
  };
}
