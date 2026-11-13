import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./HowWork";

const testimonials = [
  { name: "Alice", role: "Daily commuter", feedback: "Quick and safe rides! I use RideWave every morning and my driver is always on time." },
  { name: "Bob", role: "Business traveler", feedback: "Professional drivers and a smooth experience from booking to drop-off." },
  { name: "Charlie", role: "Student", feedback: "Easy booking process and great support. Upfront fares mean no surprises." },
];

export const Testimonials = () => {
  return (
    <section className="bg-neutral-50 px-4 py-20 dark:bg-neutral-900 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Riders love the way they move"
          subtitle="Don't just take our word for it — here's what our community says."
        />

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {testimonials.map((t) => (
            <motion.figure
              key={t.name}
              className="relative flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-black"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
            >
              <Quote className="absolute right-6 top-6 size-8 text-neutral-200 dark:text-neutral-800" />
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-black text-black dark:fill-white dark:text-white" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-neutral-700 dark:text-neutral-300">"{t.feedback}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                <span className="grid size-10 place-items-center rounded-full bg-black font-semibold text-white dark:bg-white dark:text-black">
                  {t.name[0]}
                </span>
                <div>
                  <p className="font-semibold dark:text-white">{t.name}</p>
                  <p className="text-sm text-neutral-500">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
