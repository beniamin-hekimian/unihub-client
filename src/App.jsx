import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes } from "react-router";
import LandingPage from "@/pages/LandingPage";
import SignInPage from "@/pages/SignInPage";
import AuthGuard from "@/components/AuthGuard";
import AdminDashboard from "@/pages/admin/Dashboard";
import StudentDashboard from "@/pages/student/Dashboard";
import Unauthorized from "@/components/Unauthorized";

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
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin routes */}
        <Route element={<AuthGuard allowedRole="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Student routes */}
        <Route element={<AuthGuard allowedRole="student" />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Route>
      </Routes>
    </>
  );
}
