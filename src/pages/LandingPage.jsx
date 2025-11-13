import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/landingPage/Hero";
import Stats from "@/components/landingPage/Stats";
import Features from "@/components/landingPage/Features";
import Testimonials from "@/components/landingPage/Testimonials";
import Footer from "@/components/Footer";

export default function LandingPage() {
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
