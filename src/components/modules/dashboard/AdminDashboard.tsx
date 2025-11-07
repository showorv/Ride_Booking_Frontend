
import { useGetAnalyticsQuery } from "@/redux/features/admin/admin.api";

export const AdminDashboard = () => {
  const { data, isLoading } = useGetAnalyticsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;

  const {
    totalUsers,
    totalDrivers,
    totalRides,
    totalRevenue,
    activeDrivers,
  } = data?.data || {};

  const stats = [
    { label: "Total Users", value: totalUsers },
    { label: "Total Drivers", value: totalDrivers },
    { label: "Active Drivers", value: activeDrivers },
    { label: "Total Rides", value: totalRides },
    { label: "Total Revenue", value: `$${totalRevenue}` },
  ];

  return (
    <div className="space-y-6">

  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center mt-6">
    Admin Analytics
  </h2>
    <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-black rounded-xl shadow-md p-4 flex flex-col items-center justify-center border border-gray-200 dark:border-gray-800"
        >
          <span className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</span>
          <span className="text-2xl font-semibold mt-2">{stat.value}</span>
        </div>
      ))}
    </div>
    </div>

  );
};
