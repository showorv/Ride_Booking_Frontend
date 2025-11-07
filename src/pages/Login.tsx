import { LoginForm } from "@/components/modules/authentication/LoginForm";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">

      <Link
        to="/"
        className="flex items-center gap-2 mb-6 text-2xl font-semibold text-primary"
      >
        Ride<span className="text-foreground">Wave</span>
      </Link>


      <div className="w-full max-w-sm bg-card border border-border rounded-xl shadow-md p-6">
        <LoginForm />
      </div>
    </div>
  );
}
