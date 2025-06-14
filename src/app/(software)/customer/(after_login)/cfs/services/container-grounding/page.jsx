'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import Table from "@/app/(software)/customer/components/Table";

export default function ContainerGroundingPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Container Grounding')
	}, []);

	return (
		<section className="grid gap-8">
			<Table serviceName="Container Grounding" />
		</section>
	)
}

