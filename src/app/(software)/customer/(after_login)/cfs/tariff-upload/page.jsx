'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import RequestTable from "./components/Table";
import MobileTable from "@/app/(software)/customer/components/MobileTable";
import Table from "@/app/(software)/customer/components/Table";
import { useIsMobile } from "@/hooks/use-mobile";

export default function TariffUpload() {
	const { setTitle } = useSidebar();

	useEffect(() => {
		setTitle('Tariff Uploads & Requests')
	}, []);

	return (
		<section className="grid gap-8 min-h-dvh">
			<Tabs defaultValue="requests" className="w-full">
				<TabsList className="grid w-full grid-cols-2 bg-[var(--accent)] shadow-md shadow-foreground/40">
					<TabsTrigger value="requests" className={'w-full'}>Requests</TabsTrigger>
					<TabsTrigger value="uploads" className={'w-full'}>Uploads</TabsTrigger>
				</TabsList>

				<TabsContent value="requests" className="md:p-4 w-full h-screen">
					<RequestTable />
				</TabsContent>

				<TabsContent value="uploads" className="md:p-4 w-full h-screen">
					{
						useIsMobile() ? (
							<MobileTable serviceName="Tariff Uploads" />
						) : (
							<Table serviceName="Tariff Uploads" />
						)
					}
				</TabsContent>
			</Tabs>
		</section>
	)
}

