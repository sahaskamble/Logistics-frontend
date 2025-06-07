'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect } from "react";
import RequestList from "./components/Table";

export default function Order() {
	const { setTitle } = useSidebar();
	useEffect(() => {
		setTitle('Customer Orders')
	}, []);

	return (
		<section className="grid gap-8">
			<RequestList />
		</section>
	)
}
