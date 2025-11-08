import { useState } from "react";
import { useGetRideHistoryQuery } from "@/redux/features/ride/ride.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface RideFilters {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  minFare?: number;
  maxFare?: number;
}

export const RideHistory = () => {
  const [filters, setFilters] = useState<RideFilters>({
    page: 1,
    limit: 5,
    search: "",
    status: "",
    minFare: undefined,
    maxFare: undefined,
  });

  const { data, isLoading } = useGetRideHistoryQuery(filters);
  console.log(data);
  
  const rides = data?.data?.rides || [];
  const meta = data?.data?.meta;

  console.log(rides);
  console.log(meta);
  
  const navigate = useNavigate()


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, status: e.target.value, page: 1 }));
  };

  const handleMinFareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      minFare: value ? Number(value) : undefined,
      page: 1,
    }));
  };

  const handleMaxFareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      maxFare: value ? Number(value) : undefined,
      page: 1,
    }));
  };

  const handlePrevPage = () => {
    setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const handleNextPage = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Ride History</h2>

   
      <div className="flex flex-wrap gap-3 mb-6">
        <Input
          placeholder="Search by driver"
          value={filters.search || ""}
          onChange={handleSearchChange}
          className="max-w-xs"
        />
        <select
          value={filters.status || ""}
          onChange={handleStatusChange}
          className="border p-2 rounded-md"
        >
          <option value="">All Status</option>
          <option value="REQUESTED">Requested</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <Input
          type="number"
          placeholder="Min Fare"
          value={filters.minFare ?? ""}
          onChange={handleMinFareChange}
          className="max-w-[120px]"
        />
        <Input
          type="number"
          placeholder="Max Fare"
          value={filters.maxFare ?? ""}
          onChange={handleMaxFareChange}
          className="max-w-[120px]"
        />
      </div>

     
      {isLoading ? (
        <p>Loading...</p>
      ) : rides.length === 0 ? (
        <p>No rides found.</p>
      ) : (
        <table className="w-full border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
          <thead className="bg-neutral-100 dark:bg-neutral-900">
            <tr>
              <th className="p-3 text-left">Pickup</th>
              <th className="p-3 text-left">Drop</th>
              <th className="p-3 text-left">Fare</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Requested At</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride._id} 
              className="border-t dark:border-neutral-800 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900" 
              onClick={() => navigate(`/rider-dashboard/ride/${ride._id}`)}
              >
                <td className="p-3">{ride.pickupLocation?.address}</td>
                <td className="p-3">{ride.dropLocation?.address}</td>
                <td className="p-3">${ride.fare}</td>
                <td className="p-3 capitalize">{ride.status}</td>
                <td className="p-3">
                  {new Date(ride.timeStamps.requestedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

  
      {meta && (
        <div className="flex justify-between mt-6 ">
          <Button disabled={filters.page === 1} onClick={handlePrevPage} className="bg-black text-white dark:bg-white dark:text-black">
            Previous
          </Button>
          <Button
            disabled={filters.page >= meta.totalPages}
            onClick={handleNextPage}
            className="bg-black text-white dark:bg-white dark:text-black"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
