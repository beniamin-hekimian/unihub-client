import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar";

export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">
          <SidebarTrigger className="fixed" />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
