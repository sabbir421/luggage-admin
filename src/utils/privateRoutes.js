import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
export const PrivateRoutes = () => {
  const userReducer = useSelector((state) => state.userReducher);
  const { token } = userReducer;
  return token ? <Outlet /> : <Navigate to="/login" />;
};
