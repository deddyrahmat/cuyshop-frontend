import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function GuestRoute({ children }: any) {
  const { token, role } = useAppSelector((state: any) => {
    return state.auth;
  });

  // if (!token && !role) return <Navigate to="/login" replace />;
  if (token && role === "USER") return <Navigate to="/" replace />;

  return children || <Outlet />;
}
