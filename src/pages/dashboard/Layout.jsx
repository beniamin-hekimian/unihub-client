import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
