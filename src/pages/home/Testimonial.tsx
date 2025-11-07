

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  { name: "Alice", feedback: "Quick and safe rides!" },
  { name: "Bob", feedback: "Professional drivers and smooth experience." },
  { name: "Charlie", feedback: "Easy booking process and great support." },
];

export const Testimonials = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
      }, []);
    
      if (!mounted) return null; 
  return (
    <section className="py-16 px-6 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
          Customer Feedback
        </h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.3 } } }}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-black p-5 rounded-xl shadow-sm text-center"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-gray-600 dark:text-gray-300 mb-3">"{t.feedback}"</p>
              <span className="font-semibold dark:text-white">{t.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
