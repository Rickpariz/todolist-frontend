import { getAuthToken } from "@/lib/utils";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const token = getAuthToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
