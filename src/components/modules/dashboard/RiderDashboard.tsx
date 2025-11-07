import { useGetMeInfoQuery } from "@/redux/features/auth/auth.api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RiderDashboard = () => {
  const { data } = useGetMeInfoQuery(undefined);
  const user = data?.data;

  // Example stats, replace with real API data if available
  const stats = [
    { title: "Total Rides", value: 12 },
    { title: "Upcoming Rides", value: 2 },
    { title: "Total Spent", value: "$120" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <h1 className="text-2xl font-bold">Hello, {user?.name} 👋</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button asChild>
          <Link to="request">Request a Ride</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="history">View Ride History</Link>
        </Button>
      </div>

      {/* Recent Rides Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Rides</CardTitle>
          <CardDescription>Last 5 rides</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="p-2 border-b">Date</th>
                  <th className="p-2 border-b">Pickup</th>
                  <th className="p-2 border-b">Destination</th>
                  <th className="p-2 border-b">Fare</th>
                  <th className="p-2 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace with real data */}
                <tr>
                  <td className="p-2 border-b">2025-11-06</td>
                  <td className="p-2 border-b">Banani</td>
                  <td className="p-2 border-b">Gulshan</td>
                  <td className="p-2 border-b">$10</td>
                  <td className="p-2 border-b">Completed</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


export default RiderDashboard