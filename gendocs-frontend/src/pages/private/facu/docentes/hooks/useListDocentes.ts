import { IDocente } from "models/interfaces/IDocente";
import { useQuery } from "react-query";
import { getDocentes } from "services/docentes";

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
