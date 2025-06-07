'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import Table from "@/app/(software)/customer/components/Table";

export default function SpecialEquipmentPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Special Equipment')
	}, []);

	return (
		<section className="grid gap-8">
			<Table serviceName="Special Equipment" />
		</section>
	)
}

