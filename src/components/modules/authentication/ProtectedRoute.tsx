import { Navigate, Outlet } from "react-router-dom";
import { useGetMeInfoQuery } from "@/redux/features/auth/auth.api";

interface ProtectedRouteProps {
  redirectTo?: string;
}

export const ProtectedRoute = ({ redirectTo = "/login" }: ProtectedRouteProps) => {
  const { data, isLoading } = useGetMeInfoQuery(undefined);
  const user = data?.data; 

  if (isLoading) return <div>Loading...</div>;

  if (!user) return <Navigate to={redirectTo} replace />;


  if (user.isBlocked) return <Navigate to="/account-status" replace />;

  return <Outlet />;
};
