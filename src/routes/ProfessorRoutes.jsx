import { lazy } from "react";
import { Route, Navigate } from "react-router";
import SidebarLayout from "@/components/layout/SidebarLayout";
import AuthGuard from "@/components/AuthGuard";

// Lazy-load professor pages
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const ProfessorSubjects = lazy(() => import("@/pages/professor/Subjects"));
const ProfessorExams = lazy(() => import("@/pages/professor/Exams"));
const ProfessorResults = lazy(() => import("@/pages/professor/Results"));
const ExamResults = lazy(() => import("@/pages/professor/ExamResults"));

// Export JSX constant
export const professorRoutes = (
  <Route element={<AuthGuard allowedRole="professor" />}>
    <Route path="/professor" element={<SidebarLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="subjects" element={<ProfessorSubjects />} />
      <Route path="exams" element={<ProfessorExams />} />
      <Route path="results" element={<ProfessorResults />} />
      <Route path="results/:examId" element={<ExamResults />} />
    </Route>
  </Route>
);
