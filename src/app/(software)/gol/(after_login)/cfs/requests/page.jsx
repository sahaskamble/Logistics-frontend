'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import RequestTable from "./components/Table";

export default function RequestsPage() {
	const { setTitle } = useSidebar();

	useEffect(() => {
		setTitle('Service Requests')
	}, []);

	return (
		<section className="grid gap-8 min-h-dvh">
			<RequestTable />
		</section>
	)
}

