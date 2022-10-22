import { ICargo } from "models/interfaces/ICargo";
import { useQuery } from "react-query";
import { getCargos } from "services/cargos";

type useListCargosProps = {
  token?: number;
};

export function useListCargos({ token = 1 }: useListCargosProps) {
  const { data: cargos = [], isLoading } = useQuery<ICargo[]>(
    ["cargos", token],
    () => getCargos()
  );

  return {
    cargos,
    isLoading,
  };
}
