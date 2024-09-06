import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function PrivateRoute({ children }: any) {
  const { token, role } = useAppSelector((state: any) => {
    return state.auth;
  });

  if (!token || role !== "USER") return <Navigate to="/login" replace />;

  return children || <Outlet />;
}
