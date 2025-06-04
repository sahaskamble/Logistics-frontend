"use client";

import { SidebarProvider } from "@/contexts/SidebarProvider";
import Sidebar from "@/components/ui/Sidebar";
import ProtectedRoutes from "@/contexts/ProtectedRoutes";

export default function RootClientLayout({ children }) {
  return (
    <ProtectedRoutes allowedRoles={["Client"]}>
      <SidebarProvider>
        <Sidebar access="Client">{children}</Sidebar>
      </SidebarProvider>
    </ProtectedRoutes>
  );
}
