import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, MapPin, Navigation, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "../../assets/hero.png";
import { useGetMeInfoQuery } from "@/redux/features/auth/auth.api";

const stats = [
  { value: "50K+", label: "Happy riders" },
  { value: "2K+", label: "Verified drivers" },
  { value: "4.9", label: "Average rating" },
  { value: "24/7", label: "Live support" },
];

export const Hero = () => {
  const { data: response } = useGetMeInfoQuery(undefined);
  const user = response?.data?.user;
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const rideButton = !user
    ? { label: "Book a Ride", path: "/login" }
    : user.role === "RIDER"
    ? { label: "Book a Ride", path: "/rider-dashboard/request" }
    : user.role === "DRIVER"
    ? { label: "Find Rides", path: "/driver-dashboard/rides" }
    : { label: "Open Dashboard", path: "/superadmin-dashboard" };

  const handleBook = (e: FormEvent) => {
    e.preventDefault();
    navigate(rideButton.path, { state: { pickup, drop } });
  };

  return (
    <section className="relative overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-neutral-200 dark:text-neutral-800 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-28 sm:px-6 md:pt-32 lg:grid-cols-2 lg:gap-8 lg:pb-24 lg:pt-36">
        {/* Copy + booking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center lg:text-left"
        >
          {/* <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm dark:border-neutral-800 dark:bg-black dark:text-neutral-300">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            Drivers available near you
          </span> */}

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-black dark:text-white sm:text-5xl lg:text-6xl">
            Your ride,
            <br />
            <span className="relative inline-block">
              simplified.
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                className="absolute -bottom-2 left-0 w-full text-neutral-300 dark:text-neutral-700"
                preserveAspectRatio="none"
              >
                <path d="M2 9C80 3 220 3 298 9" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg lg:mx-0">
            Book reliable rides in seconds with verified drivers, upfront fares and real-time tracking — wherever
            you need to go.
          </p>

          {/* Booking card */}
          <form
            onSubmit={handleBook}
            className="mx-auto mt-8 max-w-lg rounded-2xl border border-neutral-200 bg-white p-3 text-left shadow-xl shadow-black/5 dark:border-neutral-800 dark:bg-black lg:mx-0"
          >
            <div className="relative space-y-2">
              <div className="absolute left-[19px] top-[22px] bottom-[22px] w-px bg-neutral-300 dark:bg-neutral-700" />
              <label className="flex items-center gap-3 rounded-xl bg-neutral-50 px-3 py-3 dark:bg-neutral-900">
                <span className="relative z-10 grid size-4 place-items-center">
                  <span className="size-2.5 rounded-full border-2 border-black dark:border-white" />
                </span>
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Pickup location"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
                />
                <Navigation className="size-4 shrink-0 text-neutral-400" />
              </label>
              <label className="flex items-center gap-3 rounded-xl bg-neutral-50 px-3 py-3 dark:bg-neutral-900">
                <span className="relative z-10 grid size-4 place-items-center">
                  <span className="size-2.5 rounded-sm bg-black dark:bg-white" />
                </span>
                <input
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="Where to?"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
                />
                <MapPin className="size-4 shrink-0 text-neutral-400" />
              </label>
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <Button type="submit" size="lg" className="h-12 flex-1 rounded-xl text-base">
                {rideButton.label} <ArrowRight className="size-4" />
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-xl">
                <Link to="/feature">Learn More</Link>
              </Button>
            </div>
          </form>

          {/* Trust row */}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <div className="flex -space-x-2">
              {["A", "B", "C", "D"].map((l, i) => (
                <span
                  key={l}
                  className="grid size-9 place-items-center rounded-full border-2 border-white text-xs font-semibold dark:border-black"
                  style={{ background: ["#171717", "#404040", "#737373", "#d4d4d4"][i], color: i < 3 ? "#fff" : "#171717" }}
                >
                  {l}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center justify-center gap-0.5 sm:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-black text-black dark:fill-white dark:text-white" />
                ))}
              </div>
              <p className="text-neutral-500">Loved by 50,000+ riders</p>
            </div>
          </div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-2xl shadow-black/10 dark:border-neutral-800 sm:p-10">
            <img src={heroImage} alt="Booking a ride on a phone" className="mx-auto w-full max-w-md" />
          </div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute left-2 top-6 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white/95 p-3 shadow-lg backdrop-blur dark:border-neutral-800 dark:bg-black/95 xl:-left-8"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-black text-white dark:bg-white dark:text-black">
              <Clock className="size-4" />
            </span>
            <div className="text-left">
              <p className="text-xs text-neutral-500">Driver arriving</p>
              <p className="text-sm font-semibold">in 3 min</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute right-2 bottom-20 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white/95 p-3 shadow-lg backdrop-blur dark:border-neutral-800 dark:bg-black/95 xl:-right-6"
          >
            <CheckCircle2 className="size-8 text-green-500" />
            <div className="text-left">
              <p className="text-xs text-neutral-500">Trip completed</p>
              <p className="text-sm font-semibold">$12.50 · 4.2 km</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium shadow-lg dark:border-neutral-800 dark:bg-black sm:flex"
          >
            <ShieldCheck className="size-4" /> Every driver verified
          </motion.div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-neutral-200 bg-white/60 backdrop-blur dark:border-neutral-800 dark:bg-black/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-neutral-200 px-4 dark:divide-neutral-800 sm:px-6 md:grid-cols-4 md:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="py-6 text-center">
              <p className="text-2xl font-bold tracking-tight sm:text-3xl">{s.value}</p>
              <p className="text-sm text-neutral-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
