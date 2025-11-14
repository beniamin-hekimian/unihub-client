import { Home, Users, BookOpen, FileText } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export default function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const role = user?.role;

  // Role-based menu items
  const roleItems = {
    admin: [
      { title: "Dashboard", url: "/admin/dashboard", icon: Home },
      { title: "Students", url: "/admin/students", icon: Users },
    ],
    student: [
      { title: "Dashboard", url: "/student/dashboard", icon: Home },
      { title: "Subjects", url: "/student/subjects", icon: BookOpen },
    ],
    professor: [
      { title: "Dashboard", url: "/professor/dashboard", icon: Home },
      { title: "Exams", url: "/professor/exams", icon: FileText },
    ],
  };

  const items = roleItems[role] || [];

  return (
    <Sidebar className="hidden md:flex">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            className="text-primary py-6 font-bold text-lg self-start hover:cursor-pointer"
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
                    className={`flex items-center gap-2 px-2 py-1 rounded-md w-full text-left ${
                      location.pathname === item.url
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-muted-foreground hover:bg-primary/5"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
