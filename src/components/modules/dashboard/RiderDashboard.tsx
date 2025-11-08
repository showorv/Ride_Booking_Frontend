import { useGetMeInfoQuery } from "@/redux/features/auth/auth.api";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RequestedRides } from "@/pages/Rider/Requested";

const RiderDashboard = () => {
  const { data } = useGetMeInfoQuery(undefined);
  const user = data?.data?.user;



  return (
    <div className="space-y-6">
    
      <h1 className="text-2xl font-bold">Hello, {user?.name} 👋</h1>

        <RequestedRides />


      <div className="flex gap-4">
        <Button asChild>
          <Link to="request">Request a Ride</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="history">View Ride History</Link>
        </Button>
      </div>

    
    </div>
  );
};


export default RiderDashboard