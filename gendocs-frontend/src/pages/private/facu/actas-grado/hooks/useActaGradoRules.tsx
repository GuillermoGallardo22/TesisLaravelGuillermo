import { TipoActaGradoEnum } from "models/enums/ActaGrado";
import { ModalidadActaGrado } from "models/enums/ModalidadActaGrado";

type useActaGradoRulesProps = {
  modalidad: string;
  tipoActaGrado: string;
};

export function useActaGradoRules({
  modalidad,
  tipoActaGrado,
}: useActaGradoRulesProps) {
  const isPRE = modalidad === ModalidadActaGrado.PRE;
  const isONL = modalidad === ModalidadActaGrado.ONL;

  const hasTema = [
    TipoActaGradoEnum.IC_AA,
    TipoActaGradoEnum.IC_PI,
    TipoActaGradoEnum.T_AA,
    TipoActaGradoEnum.T_PI,
  ].includes(tipoActaGrado as TipoActaGradoEnum);

  return {
    isPRE,
    isONL,
    hasTema,
  };
}
