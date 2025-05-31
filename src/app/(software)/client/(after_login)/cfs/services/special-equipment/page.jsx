'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileTable from "@/app/(software)/client/components/MobileTable";
import Table from "@/app/(software)/client/components/Table";

export default function SpecialEquipmentPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Special Equipment')
	}, []);

	return (
		<section className="grid gap-8">
			{
				useIsMobile() ? (
					<MobileTable serviceName="Special Equipment" />
				) : (
					<Table serviceName="Special Equipment" />
				)
			}
		</section>
	)
}

