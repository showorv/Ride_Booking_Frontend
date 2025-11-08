import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero.png";
import { useGetMeInfoQuery } from "@/redux/features/auth/auth.api";

export const Hero = () => {
  const { data: response } = useGetMeInfoQuery(undefined);
  const user = response?.data;

  const rideButton = !user
    ? { label: "Book a Ride", path: "/login" }
    : user.role === "RIDER"
    ? { label: "Book a Ride", path: "/rider-dashboard/request" }
    : { label: "Get a Ride", path: "/driver-dashboard" };

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-4 pt-32 pb-20 border-b">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center md:text-left max-w-xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black dark:text-white">
          Your Ride, Simplified.
        </h1>
        <p className="text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
          Book rides instantly with our reliable, secure, and modern ride booking system.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Button asChild>
            <Link to={rideButton.path}>{rideButton.label}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/feature">Learn More</Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9 }}
        className="flex justify-center md:justify-end mb-10 md:mb-0"
      >
        <img
          src={heroImage}
          alt="Ride illustration"
          className="w-72 md:w-96 drop-shadow-lg"
        />
      </motion.div>
    </section>
  );
};
