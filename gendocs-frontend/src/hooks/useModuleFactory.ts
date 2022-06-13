import { ModuleEnum, PlantillasGlobales } from "models/enums";

export function useModuleFactory(module: ModuleEnum) {
  const getPlantillasActa = (): PlantillasGlobales[] => {
    switch (module) {
    case ModuleEnum.FACU:
      return [
        PlantillasGlobales.PLA_ACT_FACU,
        PlantillasGlobales.PLA_ACT_SEP_FACU,
      ];
    case ModuleEnum.SUDE:
      return [
        PlantillasGlobales.PLA_ACT_SUDE,
        PlantillasGlobales.PLA_ACT_SEP_SUDE,
      ];
    default:
      throw new Error("");
    }
  };

  return {
    getPlantillasActa,
  };
}
