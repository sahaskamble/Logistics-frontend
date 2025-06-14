'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import OrdersList from "./components/Table";

export default function Order() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Customer Orders')
	}, []);

	return (
		<section className="grid gap-8">
			<OrdersList />
		</section>
	)
}
