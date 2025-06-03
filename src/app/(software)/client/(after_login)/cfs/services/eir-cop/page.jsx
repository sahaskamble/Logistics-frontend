'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileTable from "@/app/(software)/client/components/MobileTable";
import Table from "@/app/(software)/client/components/Table";

export default function EIRRequestPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('EIR / COP');
	}, []);

	return (
		<section className="grid gap-8">
			{
				useIsMobile() ? (
					<MobileTable serviceName="EIR / COP" />
				) : (
					<Table serviceName="EIR / COP" />
				)
			}
		</section>
	)
}

