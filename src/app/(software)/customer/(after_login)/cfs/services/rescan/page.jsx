'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import Table from "@/app/(software)/customer/components/Table";

export default function ReScanningPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Re-Scanning')
	}, []);

	return (
		<section className="grid gap-8">
			<Table serviceName="Re-Scanning" />
		</section>
	)
}

