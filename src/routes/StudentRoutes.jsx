import { lazy } from "react";
import { Route, Navigate } from "react-router";
import SidebarLayout from "@/components/layout/SidebarLayout";
import AuthGuard from "@/components/AuthGuard";

// Lazy-load student pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const StudentSubjects = lazy(() => import("@/pages/student/Subjects"));
const StudentExams = lazy(() => import("@/pages/student/Exams"));
const StudentResults = lazy(() => import("@/pages/student/Results"));

// Export JSX constant
export const studentRoutes = (
  <Route element={<AuthGuard allowedRole="student" />}>
    <Route path="/student" element={<SidebarLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="subjects" element={<StudentSubjects />} />
      <Route path="exams" element={<StudentExams />} />
      <Route path="results" element={<StudentResults />} />
    </Route>
  </Route>
);
