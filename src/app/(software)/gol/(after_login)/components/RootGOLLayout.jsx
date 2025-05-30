'use client'

import { SidebarProvider } from "@/contexts/SidebarProvider"
import Sidebar from "@/components/ui/Sidebar"

export default function RootGOLLayout({ children }) {
	return (
		<SidebarProvider>
			<Sidebar access="GOL">
				{children}
			</Sidebar>
		</SidebarProvider>
	)
}

