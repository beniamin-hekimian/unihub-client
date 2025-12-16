import {
  Home,
  Users,
  FileText,
  ListChecks,
  GraduationCap,
  BookOpen,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import Modal from "react-modal";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const role = user?.role;

  const [modalOpen, setModalOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const roleItems = {
    admin: [
      { title: "Dashboard", url: "/admin/dashboard", icon: Home },
      { title: "Students", url: "/admin/students", icon: GraduationCap },
      { title: "Professors", url: "/admin/professors", icon: Users },
      { title: "Subjects", url: "/admin/subjects", icon: BookOpen },
    ],
    professor: [
      { title: "Dashboard", url: "/professor/dashboard", icon: Home },
      { title: "Subjects", url: "/professor/subjects", icon: BookOpen },
      { title: "Exams", url: "/professor/exams", icon: FileText },
      { title: "Results", url: "/professor/results", icon: ListChecks },
    ],
    student: [
      { title: "Dashboard", url: "/student/dashboard", icon: Home },
      { title: "Subjects", url: "/student/subjects", icon: BookOpen },
      { title: "Exams", url: "/student/exams", icon: FileText },
      { title: "Results", url: "/student/results", icon: ListChecks },
    ],
  };

  const items = roleItems[role] || [];

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
      navigate("/");
    } finally {
      setLoggingOut(false);
      setModalOpen(false);
    }
  }

  return (
    <>
      <Sidebar className="hidden md:flex">
        <SidebarContent className="flex flex-col h-full">
          <SidebarGroup className="flex-1">
            <SidebarGroupLabel
              className="text-primary py-6 font-bold text-xl self-start hover:cursor-pointer"
              onClick={() => navigate("/")}
            >
              UniHub
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.url)}
                      className={
                        location.pathname === item.url
                          ? "bg-primary/10 text-primary font-semibold hover:bg-primary/10 hover:text-primary"
                          : ""
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Logout pinned at bottom */}
          <SidebarGroup>
            <SidebarMenuButton
              onClick={() => setModalOpen(true)}
              className="text-red-600 hover:bg-red-100 rounded-md flex items-center gap-2"
              disabled={loggingOut}
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => !loggingOut && setModalOpen(false)}
        className="bg-background p-6 max-w-md mx-auto mt-40 rounded-xl shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black/50 z-40 flex justify-center items-start"
      >
        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
        <p className="text-muted-foreground mb-6">
          Are you sure you want to log out? You can always come back anytime.
        </p>
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => setModalOpen(false)}
            disabled={loggingOut}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </Modal>
    </>
  );
}
