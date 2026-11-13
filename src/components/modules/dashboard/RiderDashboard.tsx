import { Link } from "react-router-dom";
import { ArrowRight, History, MapPin, ShieldCheck, UserCog } from "lucide-react";
import { useGetMeInfoQuery } from "@/redux/features/auth/auth.api";
import { Button } from "@/components/ui/button";
import { RequestedRides } from "@/pages/Rider/Requested";

const RiderDashboard = () => {
  const { data } = useGetMeInfoQuery(undefined);
  const user = data?.data?.user;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const actions = [
    { title: "Request a Ride", desc: "Set pickup & drop-off", path: "request", icon: MapPin },
    { title: "Ride History", desc: "See your past trips", path: "history", icon: History },
    { title: "Profile", desc: "Update your details", path: "/profile", icon: UserCog },
    { title: "Become a Driver", desc: "Earn on your schedule", path: "/become-driver", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-black p-6 text-white dark:bg-white dark:text-black sm:p-8">
        <div className="absolute -right-12 -top-12 size-56 rounded-full border-[28px] border-white/5 dark:border-black/5" />
        <div className="relative max-w-lg">
          <p className="text-sm text-neutral-400 dark:text-neutral-500">{greeting},</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">{user?.name ?? "Rider"} 👋</h2>
          <p className="mt-2 text-sm text-neutral-300 dark:text-neutral-600">
            Where are you heading today? Book a ride in seconds.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-white text-black hover:bg-neutral-200 dark:bg-black dark:text-white dark:hover:bg-neutral-800">
              <Link to="request">
                Request a Ride <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white dark:border-black/20 dark:text-black dark:hover:bg-black/10 dark:hover:text-black"
            >
              <Link to="history">View Ride History</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <Link
              key={a.title}
              to={a.path}
              className="group rounded-2xl border border-neutral-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-800 dark:bg-black sm:p-5"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-neutral-100 transition-colors group-hover:bg-black group-hover:text-white dark:bg-neutral-900 dark:group-hover:bg-white dark:group-hover:text-black">
                <Icon className="size-5" />
              </span>
              <p className="mt-3 text-sm font-semibold sm:text-base">{a.title}</p>
              <p className="text-xs text-neutral-500 sm:text-sm">{a.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* Requested rides */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-black sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Requested Rides</h3>
            <p className="text-sm text-neutral-500">Rides waiting for a driver</p>
          </div>
        </div>
        <RequestedRides />
      </section>
    </div>
  );
};

export default RiderDashboard;
