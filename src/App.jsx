import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes } from "react-router";
import LandingPage from "@/pages/LandingPage";
import SignInPage from "@/pages/SignInPage";
import AdminDashboard from "@/pages/admin/Dashboard";

export default function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}
