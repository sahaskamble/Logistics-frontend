"use client";

import { SidebarProvider } from "@/contexts/SidebarProvider";
import Sidebar from "@/components/ui/Sidebar";
import ProtectedRoutes from "@/contexts/ProtectedRoutes";

export default function RootGOLLayout({ children }) {
  return (
    <ProtectedRoutes allowedRoles={["Gol"]}>
      <SidebarProvider>
        <Sidebar access="GOL">{children}</Sidebar>
      </SidebarProvider>
    </ProtectedRoutes>
  );
}
