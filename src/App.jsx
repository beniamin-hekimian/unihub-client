import { Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/Loading";

// Public pages
const Homepage = lazy(() => import("@/pages/Homepage"));
const SignInPage = lazy(() => import("@/pages/SignInPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Role-based routes
import { adminRoutes } from "@/routes/AdminRoutes";
import { professorRoutes } from "@/routes/ProfessorRoutes";
import { studentRoutes } from "@/routes/StudentRoutes";

export default function App() {
  return (
    <>
      {/* Suspense wraps all lazy-loaded pages */}
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public routes */}
          <Route index element={<Homepage />} />
          <Route path="/signin" element={<SignInPage />} />

          {/* Role-based routes */}
          {adminRoutes}
          {professorRoutes}
          {studentRoutes}

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      {/* Global toast notifications */}
      <ToastContainer />
    </>
  );
}
