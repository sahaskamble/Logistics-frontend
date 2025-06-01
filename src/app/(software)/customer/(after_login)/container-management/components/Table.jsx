import { DataTable } from '@/components/ui/Table';
import { useCollection } from '@/hooks/useCollection'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Form from './Form';
import EditForm from './EditForm';
import { useAuth } from '@/contexts/AuthContext';

export default function Table() {
	const { data, deleteItem } = useCollection('containers', {
		expand: 'ownedBy',
	});
	const { user } = useAuth();
	const [filteredData, setFilteredData] = useState([]);

	const getStatusColor = (status) => {
		switch (status) {
			case 'Free':
				return 'bg-green-100 text-green-800 border-2 border-green-600';
			case 'Broken':
				return 'bg-yellow-100 text-yellow-800 border-2 border-yellow-500';
			case 'Damaged':
				return 'bg-red-100 text-red-800 border-2 border-red-600';
			default:
				return 'bg-gray-100 text-gray-800 border-2 border-gray-500';
		}
	};

	const columns = [
		{
			id: 'id',
			accessorKey: 'id',
			header: 'Container ID',
			filterable: true,
			cell: ({ row }) => <div>{row.original.id}</div>,
		},
		{
			id: 'containerNo',
			accessorKey: 'containerNo',
			header: 'Container No.',
			filterable: true,
			cell: ({ row }) => <div>{row.original.containerNo}</div>,
		},
		{
			id: 'ownedBy',
			accessorKey: 'ownedBy',
			header: 'Owned By',
			filterable: true,
			cell: ({ row }) => <div>{row.original?.expand?.ownedBy?.name}</div>,
		},
		{
			id: 'size',
			accessorKey: 'size',
			header: 'Size',
			filterable: true,
			cell: ({ row }) => <div>{row.original.size}</div>,
		},
		{
			id: 'cargoType',
			accessorKey: 'cargoType',
			header: 'Cargo Type',
			filterable: true,
			cell: ({ row }) => <div>{row.original.cargoType}</div>,
		},
		{
			id: 'status',
			accessorKey: 'status',
			header: 'Status',
			filterable: true,
			cell: ({ row }) => (
				<div className={`px-2 py-1 text-xs rounded-full ${getStatusColor(row.original.status)}`}>
					{row.original.status}
				</div>
			),
		},
		{
			id: 'actions',
			accessorKey: 'actions',
			header: 'Actions',
			filterable: false,
			cell: ({ row }) => (
				<div className='flex gap-2 items-center justify-center'>
					<EditForm info={row.original} />
					<Trash
						size={18}
						className="cursor-pointer text-primary"
						onClick={async () => {
							console.log('Delete details for', row.original.id);
							const confirmation = confirm('Are you sure you want to delete this container?');
							if (confirmation) {
								await deleteItem(row.original.id);
							}
						}}
					/>
				</div>
			),
		}
	];

	useEffect(() => {
		if (data?.length > 0 || user?.id) {
			// const filtered_data = data.filter((item) => item.ownedBy === user?.id);
			setFilteredData(data);
		}
	}, [data]);


	return (
		<div className='w-full bg-accent border shadow-md shadow-foreground/40 rounded-lg p-6'>
			<div className="flex gap-4 items-center justify-between">
				<h1 className="text-2xl font-semibold">Containers</h1>
				<Form />
			</div>

			<DataTable columns={columns} data={filteredData} />
		</div>
	)
}

