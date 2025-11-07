

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGift, FaTicketAlt, FaTags } from "react-icons/fa";

const offers = [
  { title: "10% Off First Ride", description: "Discount for new users.", icon: FaGift },
  { title: "Refer a Friend", description: "Earn credits when friends join.", icon: FaTicketAlt },
  { title: "Weekend Specials", description: "Discounted weekend fares.", icon: FaTags },
];

export const SpecialOffers = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
      }, []);
    
      if (!mounted) return null; 
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
          Special Offers
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {offers.map((offer, i) => {
            const Icon = offer.icon;
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
                <h3 className="font-semibold text-lg mb-2 dark:text-white">{offer.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{offer.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
