import { lazy } from "react";
import { Route, Navigate } from "react-router";
import SidebarLayout from "@/components/layout/SidebarLayout";
import AuthGuard from "@/components/AuthGuard";

// Lazy-load admin pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const AdminStudents = lazy(() => import("@/pages/admin/Students"));
const AdminProfessors = lazy(() => import("@/pages/admin/Professors"));
const AdminSubjects = lazy(() => import("@/pages/admin/Subjects"));

// Export JSX constant
export const adminRoutes = (
  <Route element={<AuthGuard allowedRole="admin" />}>
    <Route path="/admin" element={<SidebarLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="students" element={<AdminStudents />} />
      <Route path="professors" element={<AdminProfessors />} />
      <Route path="subjects" element={<AdminSubjects />} />
    </Route>
  </Route>
);
