import { ICarrera } from "models/interfaces/ICarrera";
import { useQuery } from "react-query";
import { getAllCarreras } from "services/carreras";

type useListCarrerasProps = {
  useQueryOptions?: {
    refetchOnWindowFocus?: boolean;
  };
};

export function useListCarreras(props?: useListCarrerasProps) {
  const { data: carreras = [], isLoading } = useQuery<ICarrera[]>(
    ["facultades"],
    () => getAllCarreras(),
    {
      refetchOnWindowFocus: props?.useQueryOptions?.refetchOnWindowFocus,
    }
  );

  return {
    carreras,
    isLoading,
  };
}
