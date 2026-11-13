import { motion } from "framer-motion";
import { Headset, Lock, MapPin, Star, Zap } from "lucide-react";
import { SectionHeading } from "./HowWork";

export const ServiceHighlights = () => {
  const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <section className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why RideWave"
          title="Everything you need for a better ride"
          subtitle="Built around speed, safety and transparency — for riders and drivers alike."
        />

        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {/* Large feature */}
          <motion.div
            variants={item}
            className="relative overflow-hidden rounded-3xl bg-black p-8 text-white dark:bg-white dark:text-black md:col-span-2 md:row-span-2 md:p-10"
          >
            <div className="absolute -bottom-24 -right-24 size-80 rounded-full border-[40px] border-white/5 dark:border-black/5" />
            <div className="absolute -bottom-8 -right-8 size-40 rounded-full border-[24px] border-white/5 dark:border-black/5" />
            <span className="grid size-12 place-items-center rounded-2xl bg-white/10 dark:bg-black/10">
              <Zap className="size-6" />
            </span>
            <h3 className="mt-6 text-2xl font-bold sm:text-3xl">Fast rides, minimal waiting</h3>
            <p className="mt-3 max-w-md text-neutral-400 dark:text-neutral-600">
              Our smart matching connects you with the nearest available driver so you spend less time waiting
              and more time moving.
            </p>
            <div className="relative mt-8 grid max-w-md grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/10 p-4 dark:bg-black/5">
                <p className="text-3xl font-bold">3 min</p>
                <p className="text-sm text-neutral-400 dark:text-neutral-600">Avg. pickup time</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 dark:bg-black/5">
                <p className="text-3xl font-bold">98%</p>
                <p className="text-sm text-neutral-400 dark:text-neutral-600">On-time arrivals</p>
              </div>
            </div>
          </motion.div>

          {[
            { title: "Secure Payments", description: "Pay with cash, card or wallet — always safe.", icon: Lock },
            { title: "Top-rated Drivers", description: "Every driver is verified and rated by riders.", icon: Star },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={item}
                className="rounded-3xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-black"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-neutral-100 dark:bg-neutral-900">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold dark:text-white">{s.title}</h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{s.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {[
            { title: "24/7 Support", description: "Real people, ready to help any time of day or night.", icon: Headset },
            { title: "Live Tracking", description: "Share your trip and follow every turn in real time.", icon: MapPin },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={item}
                className="flex items-start gap-4 rounded-3xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-lg dark:border-neutral-800 dark:bg-black"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-neutral-100 dark:bg-neutral-900">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">{s.title}</h3>
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{s.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
