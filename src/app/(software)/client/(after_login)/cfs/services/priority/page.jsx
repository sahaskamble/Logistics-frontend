'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import Table from "@/app/(software)/client/components/Table";

export default function PriorityRequestPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Priority Movements')
	}, []);

	return (
		<section className="grid gap-8">
			<Table serviceName="Priority Movements" />
		</section>
	)
}

