import { Route, Routes, Navigate } from "react-router";
import LandingPage from "@/pages/LandingPage";
import SignInPage from "@/pages/SignInPage";
import AuthGuard from "@/components/AuthGuard";
import StudentDashboard from "@/pages/student/Dashboard";
import NotFound from "@/pages/NotFound";
import SidebarLayout from "@/components/SidebarLayout";
import Dashboard from "@/pages/Dashboard";
import AdminStudents from "@/pages/admin/Students";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Admin routes */}
        <Route element={<AuthGuard allowedRole="admin" />}>
          <Route path="/admin" element={<SidebarLayout />}>
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
      {/* Toast container for notifications */}
      <ToastContainer />
    </>
  );
}
