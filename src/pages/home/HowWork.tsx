

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUserPlus, FaCarSide, FaMapMarkedAlt, FaCar } from "react-icons/fa";

const steps = [
  { title: "Sign Up", description: "Create your account to get started.", icon: FaUserPlus },
  { title: "Request a Ride", description: "Book a ride anytime, anywhere.", icon: FaMapMarkedAlt },
  { title: "Track Ride", description: "Track your driver in real-time.", icon: FaCarSide },
  { title: "Be a Driver", description: "Fill out the form to become a driver.", icon: FaCar },
];

export const HowItWorks = () => {

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
      }, []);
    
      if (!mounted) return null; 
  return (
    <section className="py-16 px-6 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
          How It Works
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                className="bg-white dark:bg-black p-5 rounded-xl shadow-sm flex flex-col items-center text-center"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-4xl mb-4 text-gray-800 dark:text-white">
                  <Icon />
                </div>
                <h3 className="font-semibold text-lg mb-2 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
