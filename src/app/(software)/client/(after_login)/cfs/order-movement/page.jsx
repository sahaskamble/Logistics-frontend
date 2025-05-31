'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import Table from "./components/Table";

export default function OrdersMovementPage() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Order Movements');
	}, []);

	return (
		<section>
			<Table />
		</section>
	)
};
