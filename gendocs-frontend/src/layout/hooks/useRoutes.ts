import { useAuthContext } from "contexts/AuthContext";
import { ModuleEnum } from "models/enums";
import { useMemo } from "react";
import { getRoutes as getFacuRoutes } from "../routes/facu";
import { getRoutes as getSudeRoutes } from "../routes/sude";
import { getRoutes as getTituRoutes } from "../routes/titu";
import { getRoutes as getCurrRoutes } from "../routes/curr";

export function useRoutes() {
  const {
    context: { user },
  } = useAuthContext();

  const hasFacuModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.FACU),
    [user.modulos]
  );

  const hasSudeModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.SUDE),
    [user.modulos]
  );

  const hasTituModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.TITU),
    [user.modulos]
  );

  const hasCurrModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.CURR),
    [user.modulos]
  );

  const facuRoutes = useMemo(
    () =>
      getFacuRoutes(
        user.roles,
        user.modulos.map((m) => m.code)
      ),
    []
  );

  const sudeRoutes = useMemo(
    () =>
      getSudeRoutes(
        user.roles,
        user.modulos.map((m) => m.code)
      ),
    []
  );

  const tituRoutes = useMemo(() => getTituRoutes(), []);
  const currRoutes = useMemo(() => getCurrRoutes(), []);

  return {
    hasFacuModule,
    hasTituModule,
    hasSudeModule,
    hasCurrModule,
    //
    facuRoutes,
    sudeRoutes,
    tituRoutes,
    currRoutes,
  };
}
