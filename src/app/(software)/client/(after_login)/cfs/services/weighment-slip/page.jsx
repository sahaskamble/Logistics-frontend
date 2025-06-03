'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import Table from "@/app/(software)/client/components/Table";

export default function WeighmentSlipPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Weighment Slip')
	}, []);

	return (
		<section className="grid gap-8">
			<Table serviceName="Weighment Slip" />
		</section>
	)
}

