
import { useState } from "react";
import { useGetAllUsersQuery, useBlockRiderMutation, useUnblockRiderMutation } from "@/redux/features/admin/admin.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllUsersQuery({ search, page, limit: 10 });
  const [blockUser] = useBlockRiderMutation();
  const [unblockUser] = useUnblockRiderMutation();

  const handleBlock = async (id: string, isBlocked: boolean) => {
    try {
      if (isBlocked) {
        await unblockUser(id).unwrap();
        toast.success("User unblocked successfully");
      } else {
        await blockUser(id).unwrap();
        console.log("Blocking user with id:", id)
        toast.success("User blocked successfully");
      }
    } catch {
      toast.error("Action failed");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white dark:bg-black rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      <div className="flex items-center gap-3 mb-4">
        <Input
          placeholder="Search user by name, email or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setPage(1)}>Search</Button>
      </div>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((user: any) => (
            <tr key={user._id} className="text-center">
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.phone}</td>
              <td className="p-2 border">{user.isBlocked ? "Blocked" : "Active"}</td>
              <td className="p-2 border">
                <Button
                  size="sm"
                  variant={user.isBlocked ? "outline" : "destructive"}
                  onClick={() => handleBlock(user._id, user.isBlocked)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
      <div className="flex justify-between items-center mt-4">
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {page} of {Math.ceil(data?.meta?.total / 10) || 1}
        </span>
        <Button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= Math.ceil(data?.meta?.total / 10)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
