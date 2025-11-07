

import { motion } from "framer-motion";
import { FaBullseye, FaHandsHelping, FaUsers } from "react-icons/fa";
import a1 from '../assets/a1.png';
import a2 from '../assets/a2.png';
import a3 from '../assets/a3.png';
import heroImage from "../assets/hero.png";
import { useEffect, useState } from "react";
const missionVision = [
  {
    title: "Our Mission",
    description: "To provide safe, quick, and affordable rides for everyone.",
    icon: FaBullseye,
  },
  {
    title: "Our Vision",
    description: "To become the most trusted ride service in every city we operate.",
    icon: FaHandsHelping,
  },
  {
    title: "Our Values",
    description: "Safety, Reliability, and Customer Satisfaction are our top priorities.",
    icon: FaUsers,
  },
];

const team = [
  { name: "Alice Johnson", role: "CEO", image: a1},
  
  { name: "Charlie Lee", role: "Lead Developer", image: a2 },
  { name: "Diana Rose", role: "Marketing Head", image:a3 },
];

export const AboutPage = () => {

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) return null; 
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

       
        <motion.div
          className="flex flex-col md:flex-row items-center gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={heroImage}
            alt="About Hero"
            className="w-full md:w-1/2 rounded-xl shadow-lg"
          />
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
              About Our Company
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              We are a forward-thinking ride-booking service committed to providing
              safe, fast, and affordable transportation. Our platform connects riders
              with professional drivers while ensuring seamless experiences.
            </p>
          </div>
        </motion.div>

     
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
            Our Mission & Vision
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {missionVision.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-white dark:bg-black p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Icon className="text-4xl mb-3 text-gray-800 dark:text-white" />
                  <h3 className="font-semibold text-xl mb-2 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

  
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">
            Meet Our Team
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-black p-4 rounded-xl shadow-md flex flex-col items-center text-center"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-3 shadow-sm"
                />
                <h3 className="font-semibold text-lg dark:text-white">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

      </div>
    </div>
  );
};
