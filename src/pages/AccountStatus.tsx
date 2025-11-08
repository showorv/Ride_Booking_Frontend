import { Button } from "@/components/ui/button";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export default function AccountStatus() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Account Restricted</h1>
      <p className="text-gray-700 dark:text-gray-300 max-w-md">
        Your account has been temporarily blocked or suspended.  
        Please contact support or the admin team for more information.
      </p>

      <div className="mt-6 flex gap-4">
        <Button onClick={() => navigate("/contact")} variant="default">
          Contact Support
        </Button>
        <Button onClick={() => handleLogout()} variant="outline" >
          Logout
        </Button>
      </div>
    </div>
  );
}
