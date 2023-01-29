import { useAuthContext } from "contexts/AuthContext";
import { ModuleEnum } from "models/enums/Module";
import { useMemo } from "react";
import { getRoutes as getCommRoutes } from "../routes/common";
import { getRoutes as getEstuRoutes } from "../routes/estu";
import { getRoutes as getCurrRoutes } from "../routes/curr";
import { getRoutes as getFacuRoutes } from "../routes/facu";
import { getRoutes as getSudeRoutes } from "../routes/sude";
//TITULACION
import { getRoutes as getSistRoutes } from "../routes/sist";
import { getRoutes as getInpaRoutes } from "../routes/inpa";
import { getRoutes as getElecRoutes } from "../routes/elec";
//TITULACION
//INTEGRACION CURRICULAR
import { getRoutes as getSoftRoutes } from "../routes/soft";
import { getRoutes as getTeciRoutes } from "../routes/teci";
import { getRoutes as getTeleRoutes } from "../routes/tele";
import { getRoutes as getIndsRoutes } from "../routes/inds";
//INTEGRACION CURRICULAR
import { getRoutes as getTituRoutes } from "../routes/titu";

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

   //titulacion
   const hasSistModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.SIST),
    [user.modulos]
  );

  const hasInpaModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.INPA),
    [user.modulos]
  );

  const hasElecModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.ELEC),
    [user.modulos]
  );
  //titulacion

  //Integracion curricular
  const hasSoftModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.SOFT),
    [user.modulos]
  );

  const hasTeciModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.TECI),
    [user.modulos]
  );

  const hasTeleModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.TELE),
    [user.modulos]
  );

  const hasIndsModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.INDS),
    [user.modulos]
  );

  //Integracion curricular

  const hasTituModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.TITU),
    [user.modulos]
  );

  const hasCurrModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.CURR),
    [user.modulos]
  );

  const hasCommModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.COMM),
    [user.modulos]
  );

  const hasEstuModule = useMemo(
    () => user.modulos.some((m) => m.code === ModuleEnum.ESTU),
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

    //titulacion
    const sistRoutes = useMemo(
      () =>
        getSistRoutes(
          user.roles,
          user.modulos.map((m) => m.code)
        ),
      []
    );
  
    const inpaRoutes = useMemo(
      () =>
        getInpaRoutes(
          user.roles,
          user.modulos.map((m) => m.code)
        ),
      []
    );
  
    const elecRoutes = useMemo(
      () =>
        getElecRoutes(
          user.roles,
          user.modulos.map((m) => m.code)
        ),
      []
    );
  
    //titulacion
  
    //integracion curricular
  
    const softRoutes = useMemo(
      () =>
        getSoftRoutes(
          user.roles,
          user.modulos.map((m) => m.code)
        ),
      []
    );
  
    const teciRoutes = useMemo(
      () =>
        getTeciRoutes(
          user.roles,
          user.modulos.map((m) => m.code)
        ),
      []
    );
  
    const teleRoutes = useMemo(
      () =>
        getTeleRoutes(
          user.roles,
          user.modulos.map((m) => m.code)
        ),
      []
    );
  
    const indsRoutes = useMemo(
      () =>
        getIndsRoutes(
          user.roles,
          user.modulos.map((m) => m.code)
        ),
      []
    );
  
    //integracion curricular

  const commRoutes = useMemo(() => getCommRoutes(), []);
  const estuRoutes = useMemo(() => getEstuRoutes(), []);
  const tituRoutes = useMemo(() => getTituRoutes(), []);
  const currRoutes = useMemo(() => getCurrRoutes(), []);

  return {
    hasFacuModule,
    hasTituModule,
    hasSudeModule,
       //TITULACION
       hasSistModule,
       hasInpaModule,
       hasElecModule,
       //TITULACION
       //INTEGRACION CURRICULAR
       hasSoftModule,
       hasTeciModule,
       hasTeleModule,
       hasIndsModule,
       //INTEGRACION CURRICULAR
    hasCurrModule,
    hasCommModule,
    hasEstuModule,
    //
    facuRoutes,
    sudeRoutes,
    //TITULACION
    sistRoutes,
    inpaRoutes,
    elecRoutes,
    //TITULACION
    //INTEGRACION CURRICULAR
    softRoutes,
    teciRoutes,
    teleRoutes,
    indsRoutes,
    //INTEGRACION CURRICULAR
    tituRoutes,
    currRoutes,
    commRoutes,
    estuRoutes,
  };
}
