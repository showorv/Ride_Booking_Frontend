
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUser, FaCar} from "react-icons/fa";

const featuresData = [
  {
    role: "Rider",
    icon: FaUser,
    features: [
      "Request a ride",
      "Cancel ride anytime",
      "Track ride in real-time",
      "View ride history",
      "Rate drivers",
    ],
  },
  {
    role: "Driver",
    icon: FaCar,
    features: [
      "Accept/Reject ride requests",
      "Update ride status (PickedUp → Completed)",
      "View earnings and ride history",
      "Toggle availability",
    ],
  },
//   {
//     role: "Admin",
//     icon: FaUserShield,
//     features: [
//       "Approve/Suspend drivers",
//       "Block/Unblock users",
//       "View all rides, users, and drivers",
//       "Generate analytics reports",
//     ],
//   },
];

export const FeaturesPage = () => {

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
      }, []);
    
      if (!mounted) return null; 

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center dark:text-white">
          Features
        </h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {featuresData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className="bg-white dark:bg-black p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <Icon className="text-4xl text-gray-800 dark:text-white mb-4" />
                <h2 className="font-semibold text-xl mb-4 dark:text-white">{item.role}</h2>
                <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                  {item.features.map((f, i) => (
                    <li key={i}>• {f}</li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
};
