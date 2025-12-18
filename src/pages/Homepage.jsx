import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/homepage/Hero";
import Stats from "@/components/homepage/Stats";
import Features from "@/components/homepage/Features";
import Testimonials from "@/components/homepage/Testimonials";
import Footer from "@/components/layout/Footer";

export default function Homepage() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
    });
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <Footer />
    </>
  );
}
