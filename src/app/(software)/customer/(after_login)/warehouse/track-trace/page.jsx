'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect, useState } from "react";
import Timeline from "./components/Timeline";
import Form from "./components/Form";
import OrderDetails from "./components/OrderDetails";

export default function TrackTrace() {
	const { setTitle } = useSidebar();
	const [order, setOrder] = useState({});
	const [movements, setMovements] = useState([]);

	useEffect(() => {
		setTitle('Track & Trace');
	}, []);

	useEffect(() => {
		console.log('Triggering re-render')
	}, [order]);

	return (
		<section className="grid gap-8 w-full">
			<Form setOrder={setOrder} setMovements={setMovements} />
			{order?.id && (
				<>
					<OrderDetails order={order} movement={movements} />
					<Timeline movement={movements} />
				</>
			)}
		</section>
	)
}

