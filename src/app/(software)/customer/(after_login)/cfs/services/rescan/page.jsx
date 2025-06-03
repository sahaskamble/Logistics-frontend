'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileTable from "@/app/(software)/customer/components/MobileTable";
import Table from "@/app/(software)/customer/components/Table";

export default function ReScanningPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Re-Scanning')
	}, []);

	return (
		<section className="grid gap-8">
			{
				useIsMobile() ? (
					<MobileTable serviceName="Re-Scanning" />
				) : (
					<Table serviceName="Re-Scanning" />
				)
			}
		</section>
	)
}

