'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import OrdersList from "./components/Table";

export default function RescanRequestPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('My Orders')
	}, []);

	return (
		<section className="grid gap-8">
			<OrdersList />
		</section>
	)
}
