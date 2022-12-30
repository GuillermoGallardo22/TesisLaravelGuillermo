import { useQuery } from "react-query";
import { getMiembrosActaGrado } from "services/miembro-acta-grado";

type useActaGradoProps = {
  actaGradoId: string;
};

const useMiembrosActaGrado = ({ actaGradoId }: useActaGradoProps) => {
  const { data: miembros = [], isLoading: isLoadingMiembros } = useQuery(
    ["miembros-acta-grados", actaGradoId],
    () =>
      getMiembrosActaGrado({
        filters: {
          actaGrado: actaGradoId,
        },
      })
  );

  return {
    miembros,
    isLoadingMiembros,
  };
};

export default useMiembrosActaGrado;
