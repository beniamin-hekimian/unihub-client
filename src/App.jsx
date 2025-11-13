import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Route, Routes, Navigate } from "react-router";
import LandingPage from "@/pages/LandingPage";
import SignInPage from "@/pages/SignInPage";
import AuthGuard from "@/components/AuthGuard";
import StudentDashboard from "@/pages/student/Dashboard";
import NotFound from "@/components/NotFound";
import DashboardLayout from "@/pages/dashboard/Layout";
import Dashboard from "@/pages/dashboard/Dashboard";
import AdminStudents from "@/pages/admin/Students";

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
        <Route index element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Admin routes */}
        <Route element={<AuthGuard allowedRole="admin" />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<AdminStudents />} />
          </Route>
        </Route>

        {/* Student routes */}
        <Route element={<AuthGuard allowedRole="student" />}>
          <Route path="/student/dashboard" element={<StudentDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
