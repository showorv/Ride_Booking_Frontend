"use client";

import { useState } from "react";
import { useGetDriverRideHistoryQuery } from "@/redux/features/driver/driver.api";
import { format } from "date-fns";

export const DriverRideHistory = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch } = useGetDriverRideHistoryQuery({
    page,
    limit,
    search,
  });

  if (isLoading) return <p>Loading ride history...</p>;
  if (isError) return <p>Failed to load ride history.</p>;

  const rides = data?.data?.rides || [];
  const total = data?.data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="w-full max-w-4xl p-6 bg-white dark:bg-black rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800">
      <h2 className="text-2xl font-semibold mb-4 text-center">Ride History</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by rider name, phone, fare..."
          className="flex-1 p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-black dark:bg-white text-white rounded"
          onClick={() => refetch()}
        >
          Search
        </button>
      </div>

      <table className="w-full table-auto border-collapse border border-neutral-300 dark:border-neutral-700">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="border px-2 py-1">Rider</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">Fare</th>
            <th className="border px-2 py-1">Completed At</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride: any) => (
            <tr key={ride._id} className="text-center">
              <td className="border px-2 py-1">{ride.rider?.name || "N/A"}</td>
              <td className="border px-2 py-1">{ride.rider?.phone || "N/A"}</td>
              <td className="border px-2 py-1">${ride.fare}</td>
              <td className="border px-2 py-1">
                {ride.timeStamps?.completedAt
                  ? format(new Date(ride.timeStamps.completedAt), "dd MMM yyyy, hh:mm a")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="mt-4 flex justify-between items-center">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
