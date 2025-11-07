import { useState } from "react";
import { useChangePasswordMutation } from "@/redux/features/user/user.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<Props> = ({ open, onClose }) => {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(form);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword({ oldPassword: form.oldPassword, newPassword: form.newPassword }).unwrap();
      toast.success("Password changed successfully!");
      onClose();
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to change password.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Old Password</label>
            <Input
              type="password"
              name="oldPassword"
              value={form.oldPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">New Password</label>
            <Input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Changing..." : "Change Password"}
          </Button>
        </form>

        <Button
          variant="ghost"
          className="w-full mt-2"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
