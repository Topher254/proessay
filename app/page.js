"use client";

import Hero from "./Components/Hero/Hero";
import Services from "./Components/Services/Services";
import Testimonial from "./Components/Testimonial/Testimonial";
import Writers from "./Components/Writers/Writers";

export default function Home() {
  return (
    <div>
      <Hero />
      <Services />
      <Writers />

      <Testimonial />
    </div>
  );
}
