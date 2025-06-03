'use client';

import { useSidebar } from "@/contexts/SidebarProvider";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@/components/ui/Select";
import { cfsServices } from "@/constants/services";
import { CircleCheckBig, CircleX, Clock, Eye, Verified } from "lucide-react";
import { Trash } from "lucide-react";
import { DataTable } from "@/components/ui/Table";
import { useCollection } from "@/hooks/useCollection";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileDataTable from "@/components/ui/MobileDataTable";
import EditForm from "./EditForm";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function RequestsPage() {
	const { data: requestsList, updateItem, mutation, deleteItem } = useCollection('cfs_service_requests', {
		expand: 'user,order,serviceType'
	});
	const { user } = useAuth();

	const { setTitle } = useSidebar();

	const [requests, setRequests] = useState([]);
	const [Stats, setStats] = useState({
		pending: 0,
		approved: 0,
		rejected: 0,
	});
	const [serviceType, setServiceType] = useState('');

	// Setting Title
	useEffect(() => {
		setTitle('Requests List');
	}, []);

	// For Stats
	useEffect(() => {
		if (requestsList?.length > 0) {
			setRequests(requestsList);
			let pending = 0, approved = 0, rejected = 0;
			requestsList.forEach((request) => {
				switch (request.status) {
					case 'Accepted':
						approved += 1;
						break;
					case 'Rejected':
						rejected += 1;
						break;
					case 'Pending':
						pending += 1;
						break;
				}
			});
			setStats({ pending, approved, rejected });
		}
	}, [requests, requestsList]);

	const handleStatusUpdate = async (id, status = 'Pending') => {
		try {
			await updateItem(id, {
				status: status,
				merchantVerified: true,
				merchantVerifiedBy: user?.id
			});
			toast.success('Updated');
		} catch (error) {
			console.log(error)
			toast.error(error.message);
		} finally {
			mutation()
		}
	}

	const RequestColumns = [
		{
			id: 'id',
			accessorKey: 'id',
			header: 'Request ID',
			filterable: true,
			cell: ({ row }) => <div>{row.original.id}</div>,
		},
		{
			id: 'order-no',
			accessorKey: 'order.id',
			header: 'Order ID',
			filterable: true,
			cell: ({ row }) => <div>{row.original.order}</div>,
		},
		{
			id: 'remarks',
			accessorKey: 'remarks',
			header: 'Your Remarks',
			filterable: true,
			cell: ({ row }) => <div>{row.original.customerRemarks}</div>,
		},
		{
			id: 'reason',
			accessorKey: 'reason',
			header: 'Reason',
			filterable: true,
			cell: ({ row }) => <div>{row.original.clientReason}</div>,
		},
		{
			id: 'serviceType',
			accessorKey: 'serviceType',
			header: 'Service Type',
			filterable: true,
			cell: ({ row }) => <div>{row.original?.expand?.serviceType?.title}</div>,
		},
		{
			id: 'status',
			accessorKey: 'status',
			header: 'Status',
			filterable: true,
			cell: ({ row }) => <div className={`${getStatusColor(row.original.status)} rounded-xl px-4 py-2 text-center`}>{row.original.status}</div>,
		},
		{
			id: 'actions',
			accessorKey: 'actions',
			header: 'Actions',
			filterable: false,
			cell: ({ row }) => (
				<div className='flex gap-2 items-center'>
					<Eye
						size={18}
						className="cursor-pointer text-primary"
						onClick={() => console.log('View details for', row.original.id)}
					/>
					<CircleCheckBig
						size={18}
						className="cursor-pointer text-primary"
						onClick={() => handleStatusUpdate(row.original.id, 'Accepted')}
					/>
					<EditForm info={row.original} />
					<Trash
						size={18}
						className="cursor-pointer text-primary"
						onClick={async () => {
							console.log('Delete details for', row.original.id);
							const confirmation = confirm('Are you sure you want to delete this entry?');
							if (confirmation) {
								await deleteItem(row.original.id);
							}
						}}
					/>
				</div>
			),
		}
	]

	const getStatusColor = (status) => {
		switch (status) {
			case 'Accepted':
				return 'bg-green-100 text-green-800 border-2 border-green-600';
			case 'Pending':
				return 'bg-yellow-100 text-yellow-800 border-2 border-yellow-500';
			case 'Rejected':
				return 'bg-red-100 text-red-800 border-2 border-red-600';
			default:
				return 'bg-gray-100 text-gray-800 border-2 border-gray-500';
		}
	};

	return (
		<section className="grid gap-8 w-full">
			{/* Stats */}
			<div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 cursor-pointer">
				<div
					onClick={() => setRequests(requestsList.filter(r => r.status === 'Accepted'))}
					className="border rounded-lg p-6 grid gap-2 shadow-md shadow-foreground/40 bg-[var(--accent)]"
				>
					<div className="flex items-center justify-between">
						<h4 className="text-base">Approved</h4>
						<Verified className="bg-green-100 text-green-500 w-10 h-10 rounded-md p-1.5 border-2 border-green-500" />
					</div>
					<h1 className="text-3xl font-semibold">{Stats.approved}</h1>
				</div>
				<div
					onClick={() => setRequests(requestsList.filter(r => r.status === 'Pending'))}
					className="border rounded-lg p-6 grid gap-2 shadow-md shadow-foreground/40 bg-[var(--accent)]"
				>
					<div className="flex items-center justify-between">
						<h4 className="text-base">Pending</h4>
						<Clock className="bg-yellow-100 text-yellow-500 w-10 h-10 rounded-md p-1.5 border-2 border-yellow-500" />
					</div>
					<h1 className="text-3xl font-semibold">{Stats.pending}</h1>
				</div>
				<div
					onClick={() => setRequests(requestsList.filter(r => r.status === 'Rejected'))}
					className="border rounded-lg p-6 grid gap-2 shadow-md shadow-foreground/40 bg-[var(--accent)]"
				>
					<div className="flex items-center justify-between">
						<h4 className="text-base">Rejected</h4>
						<CircleX className="bg-red-100 text-red-500 w-10 h-10 rounded-md p-1.5 border-2 border-red-500" />
					</div>
					<h1 className="text-3xl font-semibold">{Stats.rejected}</h1>
				</div>
			</div>

			{/* Table */}
			<div className="p-6 border border-foreground shadow-md shadow-foreground/40 rounded-xl bg-[var(--accent)]">
				<div className="flex items-center justify-between bg-[var(--accent)]">
					<h1 className="text-2xl font-semibold">Request Lists</h1>
				</div>
				{
					useIsMobile() ? (
						<MobileDataTable data={requests} columns={RequestColumns} additionalFilters={
							<Select
								placeholder="Service Type"
								value={serviceType}
								onValueChange={(value) => {
									if (value === '' || value === 'all') {
										setRequests(requestsList);
									} else {
										setRequests(requestsList.filter((request) => request.serviceType === value));
										setServiceType(value)
									}
								}}
							>
								<SelectItem value={'all'}>All Services</SelectItem>
								{cfsServices.map((service, index) => (
									<SelectItem key={index} value={service.id}>{service.title}</SelectItem>
								))}
							</Select>
						} />
					) : (
						<DataTable data={requests} columns={RequestColumns} additionalFilters={
							<Select
								placeholder="Service Type"
								value={serviceType}
								onValueChange={(value) => {
									if (value === '' || value === 'all') {
										setRequests(requestsList);
									} else {
										setRequests(requestsList.filter((request) => request.serviceType === value));
										setServiceType(value)
									}
								}}
							>
								<SelectItem value={'all'}>All Services</SelectItem>
								{cfsServices.map((service, index) => (
									<SelectItem key={index} value={service.id}>{service.title}</SelectItem>
								))}
							</Select>
						} />

					)
				}
			</div>
		</section>
	)
}
