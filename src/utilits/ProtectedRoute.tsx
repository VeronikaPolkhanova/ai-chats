import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface IProtectedRouteProps {
  children: any;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { isAuthenticated }: any = useAuth0();
  if (!isAuthenticated) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
