import { Hero } from "./home/Hero"
import { HowItWorks } from "./home/HowWork"
import { SpecialOffers } from "./home/Offer"
import { ServiceHighlights } from "./home/Service"
import { Testimonials } from "./home/Testimonial"


export const Home = () => {
  return (
    <div>
        <Hero />
        <HowItWorks />
      <ServiceHighlights />
      <Testimonials />
      <SpecialOffers />
    </div>
  )
}
