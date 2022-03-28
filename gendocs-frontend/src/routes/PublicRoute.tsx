import { useAuthContext } from "contexts/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute: React.FC = ({ children }) => {
  const {
    context: { isAuth },
  } = useAuthContext();

  return !isAuth ? <>{children}</> : <Navigate to="/" replace />;
};

export default PublicRoute;
