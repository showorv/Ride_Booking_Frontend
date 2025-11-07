

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBolt, FaHeadset, FaLock, FaStar } from "react-icons/fa";

const services = [
  { title: "Fast Rides", description: "Quick and reliable rides.", icon: FaBolt },
  { title: "24/7 Support", description: "We are here anytime.", icon: FaHeadset },
  { title: "Secure Payments", description: "Pay safely online.", icon: FaLock },
  { title: "Driver Ratings", description: "Top-rated drivers.", icon: FaStar },
];

export const ServiceHighlights = () => {

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
      }, []);
    
      if (!mounted) return null; 
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
          Our Services
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                className="bg-white dark:bg-black p-5 rounded-xl shadow-sm flex flex-col items-center text-center"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-4xl mb-3 text-gray-800 dark:text-white">
                  <Icon />
                </div>
                <h3 className="font-semibold text-lg mb-2 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
