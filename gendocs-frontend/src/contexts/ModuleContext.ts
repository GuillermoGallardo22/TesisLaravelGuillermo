import { ModuleContextProps } from "models/interfaces";
import { createContext, useContext } from "react";

export const ModuleContext = createContext<ModuleContextProps>(
  {} as ModuleContextProps
);

export const useModuleContext = (): ModuleContextProps => {
  const context = useContext(ModuleContext);

  if (!context)
    throw new Error("useModuleContext must be used inside of ModuleProvider");

  return context;
};
