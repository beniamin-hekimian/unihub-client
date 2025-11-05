import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";

export default function AuthGuard({ allowedRole }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/signin" replace />;
  if (user.role !== allowedRole) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
