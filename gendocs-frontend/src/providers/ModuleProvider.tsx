import { ModuleContext } from "contexts/ModuleContext";
import { ModuleContextProps as ModuleProviderProps } from "models/interfaces";

const ModuleProvider: React.FunctionComponent<ModuleProviderProps> = ({
  module,
  children,
}) => {
  return (
    <ModuleContext.Provider value={{ module }}>
      {children}
    </ModuleContext.Provider>
  );
};

export default ModuleProvider;
