'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import Table from "@/app/(software)/client/components/Table";

export default function ContainerStagingPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Container Staging')
	}, []);

	return (
		<section className="grid gap-8">
			<Table serviceName="Container Staging" />
		</section>
	)
}

