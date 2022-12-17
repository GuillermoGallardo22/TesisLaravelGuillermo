import { IFilterPaginationProps } from "models/interfaces/IPagination";
import { useQuery } from "react-query";
import { getActaGrado } from "services/actas-grado";
import { getMiembrosActaGrado } from "services/miembro-acta-grado";

type useActaGradoProps = {
  actaGradoId: string;
  options?: IFilterPaginationProps;
  props?: {
    withMiembros?: boolean;
  };
};

const useActaGrado = ({ actaGradoId, options, props }: useActaGradoProps) => {
  const {
    data: actaGrado,
    isLoading: isLoadingActaGrado,
    refetch,
  } = useQuery(["acta-grado", actaGradoId], () =>
    getActaGrado(actaGradoId, options).then((r) => r.data)
  );

  const { data: miembros = [], isLoading: isLoadingMiembros } = useQuery(
    ["miembros-acta-grados", actaGradoId],
    () =>
      getMiembrosActaGrado({
        filters: {
          actaGrado: actaGradoId,
        },
      }),
    {
      enabled: Boolean(actaGrado) && props?.withMiembros,
    }
  );

  return {
    miembros,
    isLoadingMiembros,
    isLoadingActaGrado,
    actaGrado,
    refetch,
  };
};

export default useActaGrado;
