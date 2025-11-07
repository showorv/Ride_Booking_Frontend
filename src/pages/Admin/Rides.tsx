
import { useState } from "react";
import { useGetAllRidesQuery } from "@/redux/features/admin/admin.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const RideOversight = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data, isLoading } = useGetAllRidesQuery({
    search,
    status,
    page,
    limit: 10,
    startDate,
    endDate,
  });

  const rides =  data?.data?.data; 
  const meta = data?.data?.meta;

  console.log(data);
  
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4 sm:p-6 max-w-full bg-white dark:bg-black rounded-xl shadow-md border border-gray-200 dark:border-gray-800">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Ride Oversight</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 items-stretch">
        <Input
          placeholder="Search driver/rider"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-sm"
        />
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-2 py-1 w-full sm:w-auto"
        >
          <option value="">All Status</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELED">Canceled</option>
          <option value="PENDING">Pending</option>
        </select>
        <Button
          className="w-full sm:w-auto"
          onClick={() => setPage(1)}
        >
          Search
        </Button>
      </div>

    
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[700px] text-xs sm:text-sm md:text-base border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-2 border">Rider</th>
              <th className="p-2 border">Driver</th>
              <th className="p-2 border">Vehicle</th>
              <th className="p-2 border">Fare</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Completed At</th>
            </tr>
          </thead>
          <tbody>
  {rides?.length ? (
    rides.map((ride: any) => (
      <tr key={ride._id} className="text-center even:bg-gray-50 dark:even:bg-gray-900">
        <td className="p-2 border">{ride.rider?.name || "N/A"}</td>
        <td className="p-2 border">{ride.driver?.user?.name || "N/A"}</td>
        <td className="p-2 border">{ride.driver?.vehicleNumber || "N/A"}</td>
        <td className="p-2 border">{ride.fare}</td>
        <td className="p-2 border">{ride.status}</td>
        <td className="p-2 border">
          {ride.timeStamps?.completedAt
            ? new Date(ride.timeStamps.completedAt).toLocaleString()
            : "N/A"}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={6} className="text-center p-4">
        No rides found
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="w-full sm:w-auto"
        >
          Previous
        </Button>
        <span>
  Page {page} of {Math.ceil((meta?.total || 0) / 10)}
            </span>
            <Button
            onClick={() => setPage((p) => Math.min(p + 1, Math.ceil((meta?.total || 0) / 10)))}
            disabled={page >= Math.ceil((meta?.total || 0) / 10)}
            >
            Next
            </Button>
      </div>
    </div>
  );
};
