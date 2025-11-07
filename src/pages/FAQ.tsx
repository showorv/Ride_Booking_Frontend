

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    question: "How do I register as a rider?",
    answer: "Simply create an account using your email or phone, and login to request rides.",
  },
  {
    question: "How can I become a driver?",
    answer: "Riders can submit a driver request form and provide required documents. Admin approval is required.",
  },
  {
    question: "How do I cancel a ride?",
    answer: "You can cancel a ride from your ride history before it is picked up.",
  },
  {
    question: "What payment methods are supported?",
    answer: "Currently we support Cash on Delivery (COD) and online payments.",
  },
  {
    question: "How can I report a problem?",
    answer: "You can contact our support team through the app or website contact form.",
  },
];

export const FAQPage = () => {
    const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqData.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 
  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white">
          Frequently Asked Questions
        </h1>

    
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-800 dark:text-white"
          />
        </div>

      
        <motion.div
          className="space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {filteredFaqs.length ? (
            filteredFaqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl shadow-md p-4 cursor-pointer"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold dark:text-white">{faq.question}</h3>
                  {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {openIndex === idx && (
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{faq.answer}</p>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">No FAQs found</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};
