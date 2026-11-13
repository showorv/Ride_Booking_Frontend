import { motion } from "framer-motion";
import { CarFront, MapPinned, Navigation, UserPlus } from "lucide-react";

const steps = [
  { title: "Sign Up", description: "Create your free account in under a minute.", icon: UserPlus },
  { title: "Request a Ride", description: "Enter pickup and drop-off — see your fare upfront.", icon: MapPinned },
  { title: "Track Your Ride", description: "Follow your driver in real time until you arrive.", icon: Navigation },
  { title: "Be a Driver", description: "Apply in minutes and start earning on your schedule.", icon: CarFront },
];

export const SectionHeading = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
  <div className="mx-auto mb-12 max-w-2xl text-center">
    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">{eyebrow}</span>
    <h2 className="mt-3 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">{title}</h2>
    {subtitle && <p className="mt-3 text-neutral-600 dark:text-neutral-400">{subtitle}</p>}
  </div>
);

export const HowItWorks = () => {
  return (
    <section className="bg-neutral-50 px-4 py-20 dark:bg-neutral-900 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How it works"
          title="From request to ride in four steps"
          subtitle="Getting where you need to go has never been this effortless."
        />

        <motion.div
          className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <div
            aria-hidden
            className="absolute left-[12%] right-[12%] top-10 hidden border-t-2 border-dashed border-neutral-300 dark:border-neutral-700 lg:block"
          />
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="relative flex flex-col items-center text-center"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <span className="grid size-20 place-items-center rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-black">
                    <Icon className="size-8 text-black dark:text-white" />
                  </span>
                  <span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-black text-xs font-bold text-white dark:bg-white dark:text-black">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold dark:text-white">{step.title}</h3>
                <p className="mt-2 max-w-[240px] text-sm text-neutral-600 dark:text-neutral-400">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
