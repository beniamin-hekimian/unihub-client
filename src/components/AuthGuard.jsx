import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/context/AuthContext";
import NotFound from "@/pages/NotFound";

export default function AuthGuard({ allowedRole }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/signin" replace />;

  if (user.role !== allowedRole) {
    return <NotFound />;
  }

  return <Outlet />;
}
