

import { useState } from "react";
import {
  useGetAllDriversQuery,
  useApproveDriverMutation,
  useSuspendDriverMutation,
} from "@/redux/features/admin/admin.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const DriverManagement = () => {

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllDriversQuery({ search, page, limit });
  const [approveDriver] = useApproveDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();

  const handleApprove = async (id: string) => {
    try {
      await approveDriver(id).unwrap();
      toast.success("Driver approved successfully");
    } catch (err) {
      toast.error("Failed to approve driver");
    }
  };

  const handleSuspend = async (id: string) => {
    try {
      await suspendDriver(id).unwrap();
      toast.success("Driver suspended successfully");
    } catch (err) {
      toast.error("Failed to suspend driver");
    }
  };

  if (isLoading) return <p>Loading drivers...</p>;

  return (
<div className="p-4 sm:p-6 max-w-full bg-white dark:bg-black rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
  <h2 className="text-lg sm:text-2xl font-semibold mb-4 text-center sm:text-left">
    Driver Management
  </h2>


  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-4">
    <Input
      placeholder="Search driver by name, email, or vehicle number"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full sm:max-w-sm text-sm sm:text-base"
    />
    <Button
      className="w-full sm:w-auto text-sm sm:text-base"
      onClick={() => setPage(1)}
    >
      Search
    </Button>
  </div>


  <div className="overflow-x-auto w-full rounded-lg border border-gray-300 dark:border-gray-700">
    <table className="w-full min-w-full text-xs sm:text-sm md:text-base border-collapse">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-800 text-left">
          <th className="p-1 sm:p-2 border">Name</th>
          <th className="p-1 sm:p-2 border">Email</th>
          <th className="p-1 sm:p-2 border">Phone</th>
          <th className="p-1 sm:p-2 border">Vehicle</th>
          <th className="p-1 sm:p-2 border">License</th>
          <th className="p-1 sm:p-2 border">Status</th>
          <th className="p-1 sm:p-2 border text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.data?.length ? (
          data.data.map((driver: any) => (
            <tr key={driver._id} className="text-center even:bg-gray-50 dark:even:bg-gray-900">
              <td className="p-1 sm:p-2 border">{driver.user?.name || "N/A"}</td>
              <td className="p-1 sm:p-2 border">{driver.user?.email || "N/A"}</td>
              <td className="p-1 sm:p-2 border">{driver.user?.phone || "N/A"}</td>
              <td className="p-1 sm:p-2 border">{driver.vehicleNumber || "N/A"}</td>
              <td className="p-1 sm:p-2 border">
                {driver.license ? (
                  <img
                    src={driver.license}
                    alt="Vehicle License"
                    className="w-16 sm:w-20 md:w-32 h-auto mx-auto rounded border border-gray-300"
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td className="p-1 sm:p-2 border text-sm sm:text-base">
                {driver.isApproved
                  ? "Approved"
                  : driver.isSuspend
                  ? "Suspended"
                  : "Pending"}
              </td>
              <td className="p-1 sm:p-2 border">
                <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 justify-center">
                  {!driver.isApproved && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                      onClick={() => handleApprove(driver._id)}
                    >
                      Approve
                    </Button>
                  )}
                  {!driver.isSuspend && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="text-xs sm:text-sm"
                      onClick={() => handleSuspend(driver._id)}
                    >
                      Suspend
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className="text-center p-4 text-sm sm:text-base">
              No drivers found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* 🔢 Pagination */}
  <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4">
    <Button
      onClick={() => setPage((p) => Math.max(p - 1, 1))}
      disabled={page === 1}
      className="w-full sm:w-auto text-xs sm:text-sm"
    >
      Previous
    </Button>
    <span className="text-sm sm:text-base">
      Page {page} of {Math.ceil((data?.meta?.total || 0) / limit) || 1}
    </span>
    <Button
      onClick={() => setPage((p) => p + 1)}
      disabled={page >= Math.ceil((data?.meta?.total || 0) / limit)}
      className="w-full sm:w-auto text-xs sm:text-sm"
    >
      Next
    </Button>
  </div>
</div>


  
  
  );
};

export default DriverManagement