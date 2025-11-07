

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AccountStatus() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-4xl font-bold mb-4">Account Restricted</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-md">
        Your account has been blocked or suspended.  
        Please contact our support team to resolve this issue and regain access.
      </p>

      <Button onClick={() => navigate("/")}>Go to Home</Button>
    </motion.div>
  );
}
