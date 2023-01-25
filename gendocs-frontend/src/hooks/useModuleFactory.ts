import { ModuleEnum } from "models/enums/Module";
import { PlantillasGlobales } from "models/enums/PlantillasGlobales";

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

         //TITULACION
         case ModuleEnum.SIST:
          return [
            PlantillasGlobales.PLA_ACT_SIST,
            PlantillasGlobales.PLA_ACT_SEP_SIST,
          ];
          case ModuleEnum.INPA:
            return [
              PlantillasGlobales.PLA_ACT_INPA,
              PlantillasGlobales.PLA_ACT_SEP_INPA,
            ];
            case ModuleEnum.ELEC:
              return [
                PlantillasGlobales.PLA_ACT_ELEC,
                PlantillasGlobales.PLA_ACT_SEP_ELEC,
              ];
          //TITULACION
          //INTEGRACION CURRICULAR
          case ModuleEnum.SOFT:
            return [
              PlantillasGlobales.PLA_ACT_SOFT,
              PlantillasGlobales.PLA_ACT_SEP_SOFT,
            ];
            case ModuleEnum.TECI:
              return [
                PlantillasGlobales.PLA_ACT_TECI,
                PlantillasGlobales.PLA_ACT_SEP_TECI,
              ];  
              case ModuleEnum.TELE:
                return [
                  PlantillasGlobales.PLA_ACT_TELE,
                  PlantillasGlobales.PLA_ACT_SEP_TELE,
                ];   
                case ModuleEnum.INDS:
                  return [
                    PlantillasGlobales.PLA_ACT_INDS,
                    PlantillasGlobales.PLA_ACT_SEP_INDS,
                  ];         
          //INTEGRACION CURRICULAR
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
