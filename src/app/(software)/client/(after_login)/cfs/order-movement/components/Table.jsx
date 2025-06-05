import { DataTable } from '@/components/ui/Table';
import { useCollection } from '@/hooks/useCollection'
import { Download, Eye, Trash } from 'lucide-react'
import Form from './Form';
import EditForm from './EditForm';

export default function Table() {
	const { data, deleteItem } = useCollection('cfs_order_movement', {
		expand: 'order',
	});

	const columns = [
		{
			id: 'id',
			accessorKey: 'id',
			header: 'Order No',
			filterable: true,
			cell: ({ row }) => <div>{row.original.order}</div>,
		},
		{
			id: 'igmNo',
			accessorKey: 'igmNo',
			header: 'IGM No',
			filterable: true,
			cell: ({ row }) => <div>{row.original?.expand?.order?.igmNo}</div>,
		},
		{
			id: 'blNo',
			accessorKey: 'blNo',
			header: 'BL No',
			filterable: true,
			cell: ({ row }) => <div>{row.original?.expand?.order?.blNo}</div>,
		},
		{
			id: 'boeNo',
			accessorKey: 'boeNo',
			header: 'BOE No',
			filterable: true,
			cell: ({ row }) => <div>{row.original?.expand?.order?.boeNo}</div>,
		},
		{
			id: 'status',
			accessorKey: 'status',
			header: 'Status',
			filterable: true,
			cell: ({ row }) => <div>{row.original.status}</div>,
		},
		{
			id: 'remarks',
			accessorKey: 'remarks',
			header: 'Remarks',
			filterable: true,
			cell: ({ row }) => <div>{row.original.remarks}</div>,
		},
		{
			id: 'date',
			accessorKey: 'date',
			header: 'Execution Date',
			filterable: true,
			cell: ({ row }) => <div>
				{
					new Date(row.original.date).toLocaleDateString('en-US', {
						day: 'numeric',
						month: 'short',
						year: 'numeric',
					})
				}
			</div>,
		},
		{
			id: 'actions',
			accessorKey: 'actions',
			header: 'Actions',
			filterable: false,
			cell: ({ row }) => (
				<div className='flex gap-2 items-center justify-center'>
					<Eye
						size={18}
						className="cursor-pointer text-primary"
					/>
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
					<Download
						size={18}
						className="cursor-pointer text-primary"
					/>
				</div>
			),
		}
	];


	return (
		<div className='w-full bg-accent border shadow-md shadow-foreground/40 rounded-lg p-6'>
			<div className="flex gap-4 items-center justify-between">
				<h1 className="text-2xl font-semibold">Order Movements</h1>
				<Form />
			</div>

			<DataTable columns={columns} data={data} />
		</div>
	)
}

