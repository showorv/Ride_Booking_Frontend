import { useState, useEffect } from "react";
import { useGetMeQuery, useUpdateProfileMutation } from "@/redux/features/user/user.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChangePasswordModal } from "./ChangePassword";
import { toast } from "sonner";

export const Profile = () => {
  const { data, isLoading } = useGetMeQuery(undefined);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [form, setForm] = useState({ name: "", phone: "" });
  const [file, setFile] = useState<File | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    if (data?.data?.user) {
      setForm({
        name: data.data.user.name || "",
        phone: data.data.user.phone || "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const userId = data?.data?.user?._id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    try {
      await updateProfile({ id: userId, ...form, file: file ?? undefined }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-black rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800">
        <h2 className="text-2xl font-semibold mb-6 text-center">Your Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <Input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <Input name="phone" value={form.phone} onChange={handleChange} />
          </div>

          <div>
            <label className="block mb-1 font-medium">Profile Image</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          <Button type="submit" disabled={isUpdating} className="w-full">
            {isUpdating ? "Updating..." : "Update Profile"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </Button>
        </div>

        {showPasswordModal && (
          <ChangePasswordModal
            open={showPasswordModal}
            onClose={() => setShowPasswordModal(false)}
          />
        )}
      </div>
    </div>
  );
};
