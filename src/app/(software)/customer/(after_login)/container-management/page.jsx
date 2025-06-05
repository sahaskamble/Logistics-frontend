'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import Table from "./components/Table";
import MobileTable from "./components/MobileTable";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ContainerManagementPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Containers Management');
	}, []);

	return (
		<section>
			{
				useIsMobile() ? (
					<MobileTable />
				) : (
					<Table />
				)
			}
		</section>
	)
};
