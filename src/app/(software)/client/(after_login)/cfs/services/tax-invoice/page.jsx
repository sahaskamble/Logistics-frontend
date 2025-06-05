'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileTable from "@/app/(software)/client/components/MobileTable";
import Table from "@/app/(software)/client/components/Table";

export default function TaxInvoicePage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Tax Invoice')
	}, []);

	return (
		<section className="grid gap-8">
			{
				useIsMobile() ? (
					<MobileTable serviceName="Tax Invoice" />
				) : (
					<Table serviceName="Tax Invoice" />
				)
			}
		</section>
	)
}

