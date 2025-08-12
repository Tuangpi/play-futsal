import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingSplashScreen from "../ui/errors/LoadingSplashScreen";
import type { USER_ROLE } from "@/constants/Users";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: USER_ROLE;
}

export default function ProtectedRoute({
  children,
  allowedRole,
}: ProtectedRouteProps) {
  const { loading, user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSplashScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole && user?.role && allowedRole !== user.role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
