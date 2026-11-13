import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Gift, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./HowWork";

const offers = [
  { title: "10% Off First Ride", description: "New to RideWave? Your first trip is on us — partly.", tag: "NEW USERS", icon: Gift },
  { title: "Refer a Friend", description: "Earn ride credits every time a friend joins and rides.", tag: "REWARDS", icon: Ticket },
  { title: "Weekend Specials", description: "Discounted fares every Saturday and Sunday.", tag: "LIMITED", icon: CalendarDays },
];

export const SpecialOffers = () => {
  return (
    <>
      <section className="px-4 py-20 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Special offers" title="Ride more, pay less" />

          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {offers.map((offer) => {
              const Icon = offer.icon;
              return (
                <motion.div
                  key={offer.title}
                  className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-black"
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-black text-white transition-transform group-hover:rotate-6 dark:bg-white dark:text-black">
                      <Icon className="size-6" />
                    </span>
                    <span className="rounded-full border border-dashed border-neutral-300 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-neutral-500 dark:border-neutral-700">
                      {offer.tag}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold dark:text-white">{offer.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{offer.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-20 sm:px-6 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-black px-6 py-14 text-center text-white dark:bg-white dark:text-black sm:px-12 md:py-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 text-white/5 dark:text-black/5"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Ready to ride?</h2>
            <p className="mx-auto mt-4 max-w-xl text-neutral-400 dark:text-neutral-600">
              Join thousands of riders and drivers already moving smarter with RideWave.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-xl bg-white px-6 text-black hover:bg-neutral-200 dark:bg-black dark:text-white dark:hover:bg-neutral-800">
                <Link to="/register">
                  Get Started <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-white/20 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white dark:border-black/20 dark:text-black dark:hover:bg-black/10 dark:hover:text-black"
              >
                <Link to="/become-driver">Become a Driver</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};
