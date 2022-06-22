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
      case ModuleEnum.TITU:
        return [
          PlantillasGlobales.PLA_ACT_TITU,
          PlantillasGlobales.PLA_ACT_SEP_TITU,
        ];
      case ModuleEnum.CURR:
        return [
          PlantillasGlobales.PLA_ACT_CURR,
          PlantillasGlobales.PLA_ACT_SEP_CURR,
        ];
      default:
        throw new Error("Código de plantilla no implementado");
    }
  };

  return {
    getPlantillasActa,
  };
}
