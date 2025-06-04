"use client";

import { SidebarProvider } from "@/contexts/SidebarProvider";
import Sidebar from "@/components/ui/Sidebar";
import ProtectedRoutes from "@/contexts/ProtectedRoutes";

export default function RootCustomerLayout({ children }) {
  return (
    <ProtectedRoutes allowedRoles={["Customer"]}>
      <SidebarProvider>
        <Sidebar>{children}</Sidebar>
      </SidebarProvider>
    </ProtectedRoutes>
  );
}
