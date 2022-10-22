import { ModuleEnum } from "models/enums/Module";
import ModuleProvider from "providers/ModuleProvider";
import { Outlet } from "react-router-dom";

const Home = () => (
  <ModuleProvider module={ModuleEnum.FACU}>
    <Outlet />
  </ModuleProvider>
);

export default Home;
